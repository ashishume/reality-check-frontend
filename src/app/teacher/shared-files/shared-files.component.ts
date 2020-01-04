import { ErrorServiceService } from './../../shared/services/error-service/error-service.service';
import { LoaderService } from './../../shared/services/loader-service/loader.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-shared-files',
  templateUrl: './shared-files.component.html',
  styleUrls: ['./shared-files.component.css']
})
export class SharedFilesComponent implements OnInit {


  dropdownOptions = [];
  studentsArray = [];
  public SharedFileFormGroup: FormGroup;
  ownSharedFiles;
  SharedFiles;
  sharedFiles;
  students = [];
  message;



  config = {
    displayKey: "name",
    search: true,
    height: '250px',
    placeholder: 'Select Students',
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
      upload: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {


    this.fetchSharedFiles();
    this.fetchOwnSharedFiles();


    this.apiService.fetchStudentDetails().subscribe(res => {
      if (res.status == 200) {
        this.students = res.body;
        this.dropdownOptions = this.students;
      }
      else if (res.status == 204) {
        this.students = [];
        this.dropdownOptions = this.students;
      }
    })
  }


  selectionChanged(event) {
    this.studentsArray = event.value;
  }


  fetchSharedFiles() {
    const query = {
      username: localStorage.getItem('username')
    }
    this.apiService.fetchSharedFiles(query).subscribe(sharedFiles => {
      if (sharedFiles.status == 200)
        this.sharedFiles = sharedFiles.body;
      else if (sharedFiles.status == 204)
        this.sharedFiles = [];
    })
  }



  fetchOwnSharedFiles() {
    const query = {
      username: localStorage.getItem('username')
    }
    this.apiService.fetchOwnSharedFiles(query).subscribe(ownSharedFiles => {
      if (ownSharedFiles.status == 200)
        this.ownSharedFiles = ownSharedFiles.body
      else if (ownSharedFiles.status == 204)
        this.ownSharedFiles = [];
    })

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
    let tempStudentsArray;
    tempStudentsArray = this.getStudentsArray(this.studentsArray);

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
              username: username,
              sharedPeople: tempStudentsArray,
              fileUrl: url,
              message: this.message
            }

            this.apiService.shareFiles(body).subscribe((data: any) => {
              if (data.status == 200) {
                this.fetchOwnSharedFiles()
                this.notify.showError("File Shared Successfully")
              }
            })

          }
        })
      })
    ).subscribe();
  }

  getStudentsArray(array) {
    let tempArray = [];
    array.forEach(value => {
      tempArray.push(value.username)
    })

    return tempArray;
  }

}
