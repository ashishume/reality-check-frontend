import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { ProgressComponent } from 'src/app/student/progress/progress.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    SnackBarComponent,
    LoaderComponent,
    ProfileComponent,
    ProgressComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SelectDropDownModule,

  ], exports: [
    SelectDropDownModule,
    SnackBarComponent,
    CommonModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileComponent,
    LoaderComponent,
    ProgressComponent
  ]
})
export class SharedModule { }
