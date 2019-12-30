import { AddDocumentLinksComponent } from './add-document-links/add-document-links.component';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { LeaveDetailsComponent } from './leave-details/leave-details.component';
import { IssuesComponent } from './issues/issues.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewAnswersComponent } from './view-answers/view-answers.component';
import { AddLinksComponent } from './add-links/add-links.component';
import { UpdateAnswersComponent } from './update-answers/update-answers.component';
import { AddAnswersComponent } from './add-answers/add-answers.component';
import { AdminPanelComponent } from './admin-panel.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const route: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'add-answers', component: AddAnswersComponent },
  { path: 'update-answers', component: UpdateAnswersComponent },
  { path: 'issues', component: IssuesComponent },
  { path: 'add-links', component: AddLinksComponent },
  { path: 'view-answers', component: ViewAnswersComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'leave-details', component: LeaveDetailsComponent },
  { path: 'attendance-details', component: AttendanceDetailsComponent },
  { path: 'add-documents-links', component: AddDocumentLinksComponent },

  {
    path: '',
    redirectTo: 'admin-panel',
    pathMatch: 'full'
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
