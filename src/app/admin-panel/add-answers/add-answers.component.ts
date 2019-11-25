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
    private snack: MatSnackBar
  ) { }

  sectionData = []
  answerDetails = []
  countTest = []
  testNumber;
  section;
  ngOnInit() {
    const ans = this.helper.getQuestionAnswerData()
    this.answerDetails = ans

    this.sectionData = this.helper.getSectionDetails()
    const countTest = this.helper.getTestNumber()
    this.countTest = countTest;
  }
  onSubmitAnswerForm() {
    let tempArray = []
    this.answerDetails.forEach(result => {
      var value = result.correctAnswer.toUpperCase().trim();
      tempArray.push({ questionNumber: result.questionNumber, correctAnswer: value })
    })

    const body = {
      answers: tempArray,
      section: this.section,
      testNumber: this.testNumber
    }

    this.apiService.insertTestAnswers(body).subscribe((res: any) => {
      if (res.status == 200) {
        this.snack.openFromComponent(SnackBarComponent, {
          duration: 3 * 1000,
          data: "Answers Uploaded Successfully"
        });
      }
    })

  }
}
