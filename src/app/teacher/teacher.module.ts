import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/services/shared.module';
import { TeacherComponent } from './teacher.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { UploadAnswerSheetComponent } from './upload-answer-sheet/upload-answer-sheet.component';
import { ShowWritingComponent } from './show-writing/show-writing.component';
import { UpdateMarksComponent } from './update-marks/update-marks.component';

@NgModule({
  declarations: [
    TeacherComponent,
    UploadAnswerSheetComponent,
    ShowWritingComponent,
    UpdateMarksComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    TeacherRoutingModule
  ], exports: [
    TeacherComponent
  ],
  entryComponents: [
    UploadAnswerSheetComponent
  ]
})
export class TeacherModule { }
