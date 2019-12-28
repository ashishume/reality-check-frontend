import { SharedFilesComponent } from './shared-files/shared-files.component';
import { DocumentsComponent } from './documents/documents.component';
import { TeacherComponent } from './teacher.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const route: Routes = [
  { path: '', component: TeacherComponent },
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
