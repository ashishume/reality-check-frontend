// import { UploadAnswerSheetComponent } from './upload-answer-sheet/upload-answer-sheet.component';
// import { UpdateMarksComponent } from './update-marks/update-marks.component';
// import { ShowWritingComponent } from './show-writing/show-writing.component';
import { TeacherComponent } from './teacher.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AttendanceComponent } from './attendance/attendance.component';

const route: Routes = [
  { path: '', component: TeacherComponent },
  // { path: 'show-writing', component: ShowWritingComponent },
  // { path: 'update-marks', component: UpdateMarksComponent },
  // { path: 'upload-answer-sheet', component: UploadAnswerSheetComponent },
  { path: 'attendance', component: AttendanceComponent },
  {
    path: '',
    redirectTo: 'teacher',
    pathMatch: 'full'
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
