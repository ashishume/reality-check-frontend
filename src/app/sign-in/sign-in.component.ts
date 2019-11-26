import { SigninDialogComponent } from './../shared/components/signin-dialog/signin-dialog.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  model = {
    left: true,
    middle: false,
    right: false
  };
  constructor(
    public authService: AuthService,
    private route: Router,
    public matDialog: MatDialog,
  ) { }

  username: string;
  ngOnInit() {
    this.authService.username.subscribe((data: any) => {
      this.username = data;
    })
    if (this.username == null) {
      this.username = localStorage.getItem('username');
    }

    if (this.username) {
      this.route.navigate(['dashboard']);
    }
  }


  onSignInDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '450px';
    // dialogConfig.disableClose = true;

    const dialogRef = this.matDialog.open(SigninDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result)
        this.authService.Authentication(result);
    })
  }

}
