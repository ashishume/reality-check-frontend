import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnswerHelperService } from './../../section/shared/answer-helper/answer-helper.service';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-update-answers',
  templateUrl: './update-answers.component.html',
  styleUrls: ['./update-answers.component.css']
})
export class UpdateAnswersComponent implements OnInit {

  constructor(private helper: AnswerHelperService,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<UpdateAnswersComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    console.log(data);

    if (data) {
      this.testNumber = data.testNumber;
      this.section = data.section;
      this.updatedAnswer = data.correctAnswer;
      this.questionNumber = data.questionNumber;
    }

  }
  countTests = []
  questionData = []
  sectionData = []
  updatedAnswer;
  testNumber;
  questionNumber;
  section;

  ngOnInit() {
    this.questionData = this.helper.getQuestionAnswerData()
    this.countTests = this.helper.getTestNumber()
    this.sectionData = this.helper.getSectionDetails()
  }

  onSubmitUpdateAnswer() {
    var answer = this.updatedAnswer.toUpperCase().trim()
    const body = {
      "questionNumber": this.questionNumber,
      "section": this.section,
      "testNumber": this.testNumber,
      "updatedAnswer": answer
    }
    console.log(body);
    this.apiService.updateTestAnswers(body).subscribe(data => {
      if (data.status == 200) {
        this.dialogRef.close(true)
      } else {
        this.dialogRef.close(false)
      }
    })
  }

}
