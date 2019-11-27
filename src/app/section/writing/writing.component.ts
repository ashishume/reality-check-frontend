import { MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { NavbarService } from 'src/app/shared/services/navbar-service/navbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorServiceService } from 'src/app/shared/services/error-service/error-service.service';
import { Title } from '@angular/platform-browser';
import * as Rx from 'rxjs';
import { AnswerHelperService } from '../shared/answer-helper/answer-helper.service';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/services/loader-service/loader.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.css']
})
export class WritingComponent implements OnInit {
 


  public WritingSection: FormGroup;
  imageSource;
  actualDataSize;
  selectedImage;
  imageUrl;
  section: string;
  testNumber: number;
  pdfLink: string;
  public UploadForm: FormGroup;

  constructor(
    private nav: NavbarService,
    private http: HttpClient,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private snack: MatSnackBar,
    private apiService: ApiService,
    private router: ActivatedRoute,
    private loader: LoaderService,
    private snackbar: ErrorServiceService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Upload Document Section')
    this.nav.testActive()
    this.UploadForm = this.fb.group(
      {
        upload: new FormControl('', [Validators.required]),
        sheetNumber: new FormControl('', [Validators.required]),
      },
    );
    // this.apiService.checkTestStatus().subscribe((data: any) => {
    //   if (data.onlineWriting == true || data.writing == true) {
    //     this.route.navigate(['dashboard'])
    //     this.snackbar.showError("You have already given the test")
    //   }
    // })

  }
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.testNumber = params['testNumber'];
      this.section = params['section'];
    });

    this.apiService.getTestDetails().subscribe(data => {
      data.body.testDetails.forEach(res => {
        if (this.testNumber == res.testNumber) {
          this.pdfLink = res.readingLink
        }

      })
    })

  }

  onFileSelected(event) {
    this.actualDataSize = event.target.files[0].size;

    const reader = new FileReader();
    reader.onload = (e: any) => this.imageSource = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }


  uploadImage(sheetNumber) {
    this.loader.show()
    const name = localStorage.getItem('name')
    const username = localStorage.getItem('username')
    const date = new Date().getTime()
    const filePath = username + "/" + name + "_" + date;
    const fileRef = this.storage.ref(filePath)
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          if (url) {
            this.loader.hide()
            const newUrl = url + " " + this.pdfLink;
            const body = {
              username: localStorage.getItem('username'),
              name: localStorage.getItem('name'),
              link: newUrl,
              sheetNumber: sheetNumber,
              testNumber: this.testNumber,
              section: this.section
            }
            this.apiService.insertWritingData(body).subscribe((data: any) => {
              if (data.status == 200) {
                this.snack.openFromComponent(SnackBarComponent, {
                  duration: 3 * 1000,
                  data: "Sheet No. " + sheetNumber + " Uploaded Successfully"
                });
              }
            })

          }
        })
      })
    ).subscribe();
  }



  onSubmitUploadForm1(UploadFormData) {
    this.uploadImage(UploadFormData.value.sheetNumber) //to be done
  }


  // testCompleted() {
  //   this.apiService.updateTestStatus("onlineWriting")
  //   this.route.navigate(['dashboard'])
  // }




}
