import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ErrorServiceService } from '../error-service/error-service.service';
import * as Rx from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData = localStorage.getItem('username');
  public username = new Rx.Subject();
  public userType;

  constructor(
    private router: Router,
    public matDialog: MatDialog,
    private apiService: ApiService,
    private snack: ErrorServiceService
  ) {
    if (!this.userType) {
      this.userType = localStorage.getItem('userType');
    }
  }

  activateGuard() {
    this.userType = localStorage.getItem('userType');
  }

  Authentication(data) {
    console.log(data);
    this.apiService.login(data).subscribe((data) => {
      if (data.status == 200) {
        this.userData = data.body.userDetails.username;

        localStorage.setItem('username', data.body.userDetails.username)
        this.username.next(data.body.userDetails.username)
        localStorage.setItem('userType', data.body.userDetails.userType)
        localStorage.setItem('name', data.body.userDetails.name)
        this.activateGuard()
        this.router.navigate(['dashboard']);
      } else if (data.status == 204) {
        this.snack.showError("No user found")
      }

    })

  }

  get isLoggedIn(): boolean {
    if (this.userData) {
      return true;
    } else {
      return false;
    }
  }
  get isAdmin() {
    console.log("Admin", this.userType);
    if (this.userType === "Admin") {
      return 'Admin'
    }
  }
  get isTeacher() {
    console.log("Teach", this.userType);
    if (this.userType === "Teacher") {
      return 'Teacher';
    }
  }

  // Sign out
  SignOut() {
    localStorage.clear();
    this.router.navigate([''])
  }
}
