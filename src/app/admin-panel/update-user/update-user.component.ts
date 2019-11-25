import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AnswerHelperService } from './../../section/shared/answer-helper/answer-helper.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  public EditUserFormGroup: FormGroup;
  userTypes;
  name;
  username;
  password;
  userType;
  constructor(
    private fb: FormBuilder,
    private helper: AnswerHelperService,
    @Inject(MAT_DIALOG_DATA) data,
    private matDialogRef: MatDialogRef<UpdateUserComponent>
  ) {

    if (data) {
      this.name = data.name;
      this.username = data.username;
      this.userType = data.userType;
      this.password = data.password;
    }
    this.EditUserFormGroup = this.fb.group(
      {
        name: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        userType: new FormControl('', [Validators.required]),
      },
    );

    this.userTypes = this.helper.getUserTypes();

  }

  onSubmitUserForm(updateUser) {
    this.matDialogRef.close(updateUser.value)
  }
  ngOnInit() {
  }

}
