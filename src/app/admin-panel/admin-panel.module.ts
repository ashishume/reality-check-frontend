import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { AddAnswersComponent } from './add-answers/add-answers.component';
import { UpdateAnswersComponent } from './update-answers/update-answers.component';
import { AddLinksComponent } from './add-links/add-links.component';
import { ViewAnswersComponent } from './view-answers/view-answers.component';
import { UpdateLinksComponent } from './update-links/update-links.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { IssuesComponent } from './issues/issues.component';
import { LeaveDetailsComponent } from './leave-details/leave-details.component';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AddAnswersComponent,
    UpdateAnswersComponent,
    AddLinksComponent,
    ViewAnswersComponent,
    UpdateLinksComponent,
    CreateUserComponent,
    UpdateUserComponent,
    IssuesComponent,
    LeaveDetailsComponent,
    AttendanceDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminPanelRoutingModule
  ],
  exports: [
    AdminPanelComponent,
  ],
  entryComponents: [
    UpdateUserComponent,
    UpdateAnswersComponent,
    UpdateLinksComponent,
  ]
})
export class AdminPanelModule { }
