import { ResultsComponent } from './results/results.component';
import { MarksSheetComponent } from './marks-sheet/marks-sheet.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from '../shared.module';
import { FileSharingComponent } from './file-sharing/file-sharing.component';



@NgModule({
  declarations: [
    MarksSheetComponent,
    FileSharingComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentRoutingModule
  ],
  exports: [
  ]
})
export class StudentModule { }
