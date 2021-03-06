import { AnswerHelperService } from 'src/app/section/shared/answer-helper/answer-helper.service';
import { UpdateUserComponent } from './../update-user/update-user.component';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userDetails = [];
  userTypes = [];
  name;
  username;
  password;
  userType;
  deActiveUserDetails = [];
  public CreateUserFormGroup: FormGroup;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private helper: AnswerHelperService,
    private matDialog: MatDialog,
    private titleService: Title
  ) {
    this.titleService.setTitle('Create User');
    this.CreateUserFormGroup = this.fb.group(
      {
        name: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        userType: new FormControl('', [Validators.required]),
      },
    );
  }


  ngOnInit() {
    this.userTypes = this.helper.getUserTypes();
    this.apiService.getUserDetails().subscribe(data => {
      let userDetails = [];
      let deActiveUserDetails = [];
      if (data.status == 200) {
        data.body.forEach(value => {
          if (value.status == 1)
            userDetails.push(value);
          else {
            deActiveUserDetails.push(value);
          }
        });
        this.userDetails = userDetails;
        this.deActiveUserDetails = deActiveUserDetails;
      }
    })
  }

  onEditUser(user) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    // dialogConfig.height = '400px';
    dialogConfig.data = user;

    const dialogRef = this.matDialog.open(UpdateUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.apiService.editUserDetails(result).subscribe(data => {
          if (data.status == 200) {
            this.ngOnInit()
          }
        })

      }
    })
  }

  onSubmitLoginForm(form) {
    this.apiService.createUser(form.value).subscribe(data => {
      if (data.status == 200) {
        this.ngOnInit()
      }
    })
  }

  onDeleteUser(user) {

    const query = {
      username: user.username,
    }

    this.apiService.deleteUser(query).subscribe(data => {
      if (data.status == 200)
        this.ngOnInit();
    })
  }
  onActivateUser(user) {

    const query = {
      username: user.username,
    }

    this.apiService.activateUser(query).subscribe(data => {
      if (data.status == 200)
        this.ngOnInit();
    })
  }

}
