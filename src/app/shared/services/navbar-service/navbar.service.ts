import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible: boolean;
  test: boolean;
  constructor() {
    this.visible = true;
    this.test = true;
  }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  // testActive() { this.test = false; }
}
