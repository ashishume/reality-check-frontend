import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../components/loader/loader.component';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@NgModule({
  declarations: [SnackBarComponent, LoaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ], exports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    LoaderComponent
  ]
})
export class SharedModule { }
