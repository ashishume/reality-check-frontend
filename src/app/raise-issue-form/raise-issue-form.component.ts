import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raise-issue-form',
  templateUrl: './raise-issue-form.component.html',
  styleUrls: ['./raise-issue-form.component.css']
})
export class RaiseIssueFormComponent implements OnInit {

  constructor(private mat: MatDialogRef<RaiseIssueFormComponent>) { }
  message;
  ngOnInit() {
  }

  raisedIssue() {

  }
  onSubmitIssue(IssueForm) {
    if (IssueForm.value.message != null) {
      this.mat.close(IssueForm.value)
    }

  }


}
