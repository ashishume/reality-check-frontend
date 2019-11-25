import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible: boolean;
  test: boolean;
  private typeOfUser;
  constructor() {
    this.visible = true;
    this.test = true;

    if (!this.typeOfUser) {
      this.typeOfUser = localStorage.getItem('userType');
    }


  }
  activateRouter() {
    this.typeOfUser = localStorage.getItem('userType');
  }
  get isAdmin(): string {
    if (this.typeOfUser == 'Admin') {

      return 'Admin';
    }
  }
  get isTeacher(): string {
    if (this.typeOfUser == 'Teacher') {
      return 'Teacher';
    }
  }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  testActive() { this.test = false; }
}
