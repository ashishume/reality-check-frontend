import { SnackBarComponent } from './../shared/components/snack-bar/snack-bar.component';
import { RaiseIssueFormComponent } from './../raise-issue-form/raise-issue-form.component';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { NavbarService } from '../shared/services/navbar-service/navbar.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  typeOfUser;
  constructor(
    private apiService: ApiService,
    private route: Router,
    private nav: NavbarService,
    private snack: MatSnackBar,
    private matDialog: MatDialog,
    private titleService: Title
  ) {
    this.nav.visible = true;
    this.titleService.setTitle('Dashboard')
  }

  public userType;
  public testDetails = []
  ngOnInit() {

    this.userType = localStorage.getItem('userType')
    if (this.userType == 'Academic Student' || this.userType == 'General Student') {
      this.getTestDetails()
    }


  }

  getTestDetails() {
    const query = {
      studentType: this.userType
    }
    this.apiService.getTestDetails(query).subscribe((data: any) => {
      this.testDetails = data.body[0].testDetails;
    })
  }
  raiseIssue() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '400px';
    // dialogConfig.data = data;

    const dialogRef = this.matDialog.open(RaiseIssueFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const body = {
          name: localStorage.getItem('name'),
          username: localStorage.getItem('username'),
          message: result.message
        }
        this.apiService.raiseIssue(body).subscribe(data => {
          if (data.status == 200) {

            this.snack.openFromComponent(SnackBarComponent, {
              duration: 4 * 1000,
              data: "Issue posted successfully, our team will get back to you soon"
            });
          }
        })
      }

    })
  }
}
