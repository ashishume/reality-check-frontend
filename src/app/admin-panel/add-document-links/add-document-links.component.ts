import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { LoaderService } from './../../shared/services/loader-service/loader.service';
import { TeacherService } from 'src/app/teacher/teacher-service/teacher.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorServiceService } from 'src/app/shared/services/error-service/error-service.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-document-links',
  templateUrl: './add-document-links.component.html',
  styleUrls: ['./add-document-links.component.css']
})
export class AddDocumentLinksComponent implements OnInit {
  categories = [];
  public DocumentsFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private loader: LoaderService,
    private notify: ErrorServiceService,
    private teacher: TeacherService,
    private apiService: ApiService
  ) {
    this.categories = this.teacher.category;

    this.DocumentsFormGroup = this.fb.group(
      {
        fileUrl: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.required]),
        notes: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
      })
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.DocumentsFormGroup.controls[controlName].hasError(errorName);
  }

  ngOnInit() {
  }


  actualDataSize;
  fileSource;
  selectedFile;
  documentsData;
  onFileSelected(event) {
    this.actualDataSize = event.target.files[0].size;
    const reader = new FileReader();
    reader.onload = (e: any) => this.fileSource = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedFile = event.target.files[0];
  }

  shareFileHandler(form) {

    this.loader.show()
    const name = localStorage.getItem('name')
    const username = localStorage.getItem('username')
    const date = new Date().getTime()
    const filePath = "PDF_DOCUMENTS/" + form.category + "/" + form.title + "_" + date;
    const fileRef = this.storage.ref(filePath)
    this.storage.upload(filePath, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          if (url) {
            this.loader.hide()

            const body = {
              fileUrl: url,
              title: form.title,
              notes: form.notes,
              category: form.category,
              fileType: this.selectedFile.type,
              ownerName: localStorage.getItem('name'),
              username: localStorage.getItem('username')
            }

            this.apiService.addDocumentsDetails(body).subscribe((data: any) => {
              if (data.status == 200) {
                this.notify.showError("Document uploaded Successfully")
              }
            })

          }
        })
      })
    ).subscribe();
  }

  onSubmitDocuments(form) {
    this.shareFileHandler(form.value);
  }

  fetchDocumentsData(category) {
    const query = {
      category: category
    }
    this.apiService.fetchDocumentsDetails(query).subscribe(result => {
      if (result.status == 200)
        this.documentsData = result.body;
    })
  }
}
