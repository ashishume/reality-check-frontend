import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api-service/api.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoaderService } from '../../shared/services/loader-service/loader.service';
import { ErrorServiceService } from '../../shared/services/error-service/error-service.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-file-sharing',
  templateUrl: './file-sharing.component.html',
  styleUrls: ['./file-sharing.component.css']
})
export class FileSharingComponent implements OnInit {

  dropdownOptions = [];
  teachersArray = [];
  message;
  public SharedFileFormGroup: FormGroup;
  ownSharedFiles;
  sharedFiles;
  teachers = []


  config = {
    displayKey: "name",
    search: true,
    height: '250px',
    placeholder: 'Select Teachers',
    customComparator: () => { },
    limitTo: this.dropdownOptions.length,
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'username',
    clearOnSelection: false,
  }


  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private loader: LoaderService,
    private notify: ErrorServiceService
  ) {

    this.SharedFileFormGroup = this.fb.group({
      sharedPeople: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      upload: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {

    this.fetchSharedFiles();
    this.fetchOwnSharedFiles();

    this.apiService.fetchTeacherDetails().subscribe(res => {
      if (res.status == 200) {
        this.teachers = res.body;
        this.dropdownOptions = this.teachers;
      }
    })
  }

  fetchSharedFiles() {
    const query = {
      username: localStorage.getItem('username')
    }
    this.apiService.fetchSharedFiles(query).subscribe(sharedFiles => {
      if (sharedFiles.status == 200)
        this.sharedFiles = sharedFiles.body
    })
  }



  fetchOwnSharedFiles() {
    const query = {
      username: localStorage.getItem('username')
    }
    this.apiService.fetchOwnSharedFiles(query).subscribe(ownSharedFiles => {
      if (ownSharedFiles.status == 200)
        this.ownSharedFiles = ownSharedFiles.body
    })

  }


  selectionChanged(event) {
    this.teachersArray = event.value;
  }


  actualDataSize;
  fileSource;
  selectedFile;
  onFileSelected(event) {
    this.actualDataSize = event.target.files[0].size;
    const reader = new FileReader();
    reader.onload = (e: any) => this.fileSource = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedFile = event.target.files[0];
  }

  shareFileHandler() {
    let tempTeachersArray;
    tempTeachersArray = this.getTeachersArray(this.teachersArray);

    this.loader.show()
    const name = localStorage.getItem('name')
    const username = localStorage.getItem('username')
    const date = new Date().getTime()
    const filePath = username + "/" + name + "_" + date;
    const fileRef = this.storage.ref(filePath)
    this.storage.upload(filePath, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          if (url) {
            this.loader.hide()

            const body = {
              fileType: this.selectedFile.type,
              ownerName: name,
              message: this.message,
              username: username,
              sharedPeople: tempTeachersArray,
              fileUrl: url
            }

            this.apiService.shareFiles(body).subscribe((data: any) => {
              if (data.status == 200) {
                this.fetchOwnSharedFiles();
                this.notify.showError("File Shared Successfully")
              }
            })

          }
        })
      })
    ).subscribe();
  }

  getTeachersArray(array) {
    let tempArray = [];
    array.forEach(value => {
      tempArray.push(value.username)
    })

    return tempArray;
  }

}
