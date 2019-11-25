import { ShowWritingComponent } from './show-writing/show-writing.component';
import { TeacherComponent } from './teacher.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const route: Routes = [
  { path: '', component: TeacherComponent },
  { path: 'show-writing', component: ShowWritingComponent },

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
