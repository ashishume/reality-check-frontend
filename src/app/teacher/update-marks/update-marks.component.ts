import { MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/shared/services/loader-service/loader.service';
import { AnswerHelperService } from 'src/app/section/shared/answer-helper/answer-helper.service';
import { finalize } from 'rxjs/operators';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-update-marks',
  templateUrl: './update-marks.component.html',
  styleUrls: ['./update-marks.component.css']
})
export class UpdateMarksComponent implements OnInit {

  username;
  testNumber;
  sheetNumber;
  marksBand;
  questionUrl;
  constructor(
    private fb: FormBuilder,
    private helper: AnswerHelperService,
    private apiService: ApiService,
    private snack: MatSnackBar
  ) {
    this.UploadForm = this.fb.group(
      {
        username: new FormControl('', [Validators.required]),
        testNumber: new FormControl('', [Validators.required]),
        marksBand: new FormControl('', [Validators.required]),
        section: new FormControl('', [Validators.required]),
      },
    );
  }

  countOfTests = [];
  userDetails: any = []
  sections: any = []
  public UploadForm: FormGroup;
  ngOnInit() {
    this.sections = this.helper.getSectionDetails()
    this.countOfTests = this.helper.getTestNumber()
    this.helper.getUsers()
    this.helper.getUserDetails.subscribe(data => {
      this.userDetails = data;

    })

  }

  onSubmitStudentMarks(form) {

    this.apiService.insertMarks(form.value).subscribe(data => {
      if (data.status == 200) {
        this.snack.openFromComponent(SnackBarComponent, {
          duration: 3 * 1000,
          data: "Marks details uploaded successfully"
        });
      }
    })
  }

}
