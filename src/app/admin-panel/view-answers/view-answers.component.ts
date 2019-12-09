import { UpdateAnswersComponent } from './../update-answers/update-answers.component';
import { AnswerHelperService } from 'src/app/section/shared/answer-helper/answer-helper.service';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-answers',
  templateUrl: './view-answers.component.html',
  styleUrls: ['./view-answers.component.css']
})
export class ViewAnswersComponent implements OnInit {

  constructor(private apiService: ApiService,
    private helper: AnswerHelperService,
    private matDialog: MatDialog,
    private titleService: Title
  ) {
    this.titleService.setTitle('View Answers')
  }
  countTests = []
  testNumber = 1;
  answersData = []
  sectionData = []
  deleteSection;
  deleteStudentType;
  deleteTestNumber;
  section = "Reading";
  changeType = "General Student";
  studentType = [];
  ngOnInit() {
    this.studentType = this.helper.getStudentTypes();
    this.countTests = this.helper.getTestNumber();
    this.sectionData = this.helper.getSectionDetails();
  }

  getAnswerDetails() {
    const query = {
      testNumber: this.testNumber,
      section: this.section,
      studentType: this.changeType
    }

    this.apiService.getAnswers(query).subscribe(data => {

      if (data.status == 200) {
        this.answersData = data.body[0].answers;
      }
      if (data.status == 204) {
        this.answersData = [];
      }
    })
  }

  onEditAnswer(data) {
    const body = {
      testNumber: this.testNumber,
      section: this.section,
      studentType: this.changeType,
      correctAnswer: data.correctAnswer,
      questionNumber: data.questionNumber
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = body;

    const dialogRef = this.matDialog.open(UpdateAnswersComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == true)
        this.getAnswerDetails()

    })
  }

  deleteTestDetails() {
    if (this.deleteSection && this.deleteTestNumber && this.deleteStudentType) {
      const query = {
        section: this.deleteSection,
        testNumber: this.testNumber,
        studentType: this.deleteStudentType
      }
      this.apiService.deleteAnswers(query).subscribe(data => {
        if (data.status == 200)
          this.getAnswerDetails()
      })
    }
  }

}
