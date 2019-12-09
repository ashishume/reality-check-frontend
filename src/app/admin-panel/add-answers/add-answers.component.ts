import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SnackBarComponent } from './../../shared/components/snack-bar/snack-bar.component';
import { Component, OnInit } from '@angular/core';
import { AnswerHelperService } from 'src/app/section/shared/answer-helper/answer-helper.service';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-answers',
  templateUrl: './add-answers.component.html',
  styleUrls: ['./add-answers.component.css']
})
export class AddAnswersComponent implements OnInit {

  constructor(
    private helper: AnswerHelperService,
    private apiService: ApiService,
    private snack: MatSnackBar,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Add Answers')
  }

  sectionData = []
  answerDetails = []
  countTest = []
  testNumber;
  section;
  changeType;
  studentType = []

  ngOnInit() {
    const ans = this.helper.getQuestionAnswerData()
    this.studentType = this.helper.getStudentTypes();
    this.answerDetails = ans

    this.sectionData = this.helper.getSectionDetails()
    const countTest = this.helper.getTestNumber()
    this.countTest = countTest;
  }
  onSubmitAnswerForm() {
    let tempArray = []
    this.answerDetails.forEach(result => {
      var value = result.correctAnswer.toUpperCase().trim().replace(/\s+/g, " ");
      tempArray.push({ questionNumber: result.questionNumber, correctAnswer: value })
    })

    const body = {
      answers: tempArray,
      section: this.section,
      testNumber: this.testNumber,
      studentType: this.changeType
    }

    this.apiService.insertTestAnswers(body).subscribe((res: any) => {
      if (res.status == 200) {
        this.snack.openFromComponent(SnackBarComponent, {
          duration: 3 * 1000,
          data: "Answers Uploaded Successfully"
        });
      } else if (res.status == 409) {
        // this.snack.openFromComponent(SnackBarComponent, {
        //   duration: 3 * 1000,
        //   data: "Answers Already Uploaded, Please visit the edit Answer Page"
        // });
        this.router.navigate(['admin-panel/view-answers'])
      }
    })

  }
}
