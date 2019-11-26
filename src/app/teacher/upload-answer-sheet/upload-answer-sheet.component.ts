import { AnswerHelperService } from './../../section/shared/answer-helper/answer-helper.service';
import { CalculateMarksService } from 'src/app/shared/services/calculate-marks/calculate-marks.service';
import { LoaderService } from './../../shared/services/loader-service/loader.service';
import { ApiService } from './../../shared/services/api-service/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorServiceService } from 'src/app/shared/services/error-service/error-service.service';
import { EmailService } from 'src/app/shared/services/email/email.service';

@Component({
  selector: 'app-upload-answer-sheet',
  templateUrl: './upload-answer-sheet.component.html',
  styleUrls: ['./upload-answer-sheet.component.css']
})
export class UploadAnswerSheetComponent implements OnInit {
  username;
  testNumber;
  sheetNumber;
  marksBand;
  questionUrl;
  constructor(
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    private loader: LoaderService,
    private helper: AnswerHelperService,
    private matDialogRef: MatDialogRef<UploadAnswerSheetComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {

    if (data) {
      this.username = data.username;
      this.testNumber = data.testNumber;
      this.sheetNumber = data.sheetNumber;
      this.marksBand = data.marksBand
      this.questionUrl = data.pdfUrl
    }

    this.UploadForm = this.fb.group(
      {
        username: new FormControl('', [Validators.required]),
        testNumber: new FormControl('', [Validators.required]),
        sheetNumber: new FormControl('', [Validators.required]),
        upload: new FormControl('', [Validators.required]),
        marksBand: new FormControl('', []),
      },
    );
  }

  countOfTests = [];
  userDetails: any = []

  ngOnInit() {
    this.countOfTests = this.helper.getTestNumber()
    this.helper.getUsers()
    this.helper.getUserDetails.subscribe(data => {
      this.userDetails = data;
    })

  }

  public UploadForm: FormGroup;
  selectedImage;
  imageSource;
  onFileSelected(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => this.imageSource = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }


  uploadImage(studentData) {
    let body: any = {
      username: studentData.username,
      testNumber: studentData.testNumber,
      sheetNumber: studentData.sheetNumber,
      marksBand: studentData.marksBand
    }
    this.loader.show()
    this.loader.show()
    const date = new Date().getTime()
    const filePath = studentData.username + "/TeacherChecked/" + studentData.username + "_" + date;
    const fileRef = this.storage.ref(filePath)
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          if (url) {
            const newUrl = url + " " + this.questionUrl;
            body.link = newUrl
            // this.updateStudentTestData(body);
            this.matDialogRef.close(body)
            this.loader.hide()
          }
        })
      })
    ).subscribe();
  }


  onSubmitUploadForm(UploadForm) {
    this.uploadImage(UploadForm.value)
  }


}
