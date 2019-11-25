import { SnackBarComponent } from './../shared/components/snack-bar/snack-bar.component';
import { ApiService } from '../shared/services/api-service/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { ErrorServiceService } from '../shared/services/error-service/error-service.service';
import { RaiseIssueFormComponent } from '../raise-issue-form/raise-issue-form.component';
import { EmailService } from '../shared/services/email/email.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private apiService: ApiService,
    private titleService: Title,
    private snack: MatSnackBar
  ) {
    this.titleService.setTitle('Section')
  }

  listening = false;
  reading = false;
  writing = false;
  private testNumber;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.testNumber = params['testNumber'];
    });
    const query = {
      username: localStorage.getItem('username')
    }
    this.apiService.getMarksDetails(query).subscribe(data => {
      if (data.body) {
        data.body.forEach(result => {
          if (result.testNumber == this.testNumber) {
            if (result.section == "Reading")
              this.reading = true
            if (result.section == "Listening")
              this.listening = true
            if (result.section == "Writing")
              this.writing = true
          }
        })
      }
    })

  }

  handlingListening() {
    this.route.navigate(['section/listening'], { queryParams: { testNumber: this.testNumber, section: 'Listening' } })
  }
  handlingWriting() {
    this.route.navigate(['section/writing'], { queryParams: { testNumber: this.testNumber, section: 'Writing' } })
  }
  handlingReading() {
    this.route.navigate(['section/reading'], { queryParams: { testNumber: this.testNumber, section: 'Reading' } })
  }
  checkTestHandler() {
    this.snack.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: "You have already attempted the test"
    });
  }
}
