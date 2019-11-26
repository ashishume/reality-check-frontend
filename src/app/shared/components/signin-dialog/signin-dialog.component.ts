import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin-dialog',
  templateUrl: './signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.css']
})
export class SigninDialogComponent implements OnInit {
  public LoginFormGroup: FormGroup;
  username;
  password;
  
  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<SigninDialogComponent>
  ) {
    this.LoginFormGroup = this.fb.group(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      },
    );
  }


  ngOnInit() {
  }
  onSubmitLoginForm(form) {
    this.matDialogRef.close(form.value)
  }

}
