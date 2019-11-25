import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {

  constructor(private snack: MatSnackBar) { }

  showError(message) {
    this.snack.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: message
    });
  }
}
