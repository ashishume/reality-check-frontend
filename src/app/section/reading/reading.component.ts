import * as Rx from 'rxjs';
import { CalculateMarksService } from 'src/app/shared/services/calculate-marks/calculate-marks.service';
import { AnswerHelperService } from './../shared/answer-helper/answer-helper.service';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css']
})
export class ReadingComponent implements OnInit {

  constructor(
    private helper: AnswerHelperService,
    private calculate: CalculateMarksService,
    private router: ActivatedRoute,
    private route: Router,
    private apiService: ApiService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Reading')
  }

  answerDetails = []
  section;
  testNumber;
  score;
  userType = localStorage.getItem('userType')
  checkMarksStatus = new Rx.Subject();
  pdfLink;
  ngOnInit() {

    this.router.queryParams.subscribe(params => {
      this.testNumber = params['testNumber'];
      this.section = params['section'];
    });
    const ans = this.helper.getQuestionData()
    this.answerDetails = ans

    this.getUrls()
  }


  getUrls() {
    const query = {
      studentType: this.userType
    }
    this.apiService.getTestDetails(query).subscribe(data => {
      data.body[0].testDetails.forEach(res => {
        if (this.testNumber == res.testNumber) {
          this.pdfLink = res.readingLink
        }
      })
    })
  }


  onSubmitAnswerForm() {

    let tempArray = []
    this.answerDetails.forEach(result => {
      var value = result.QValue.toUpperCase().trim().replace(/\s+/g, " ");
      tempArray.push({ questionNumber: result.QNumber, correctAnswer: value })
    })

    const body = {
      answers: tempArray,
      section: this.section,
      testNumber: parseInt(this.testNumber),
      studentType: this.userType
    }
    this.calculate.checkMarks(body).subscribe(data => {

      this.score = data;
      this.onSubmitMarks()
      this.checkMarksStatus.subscribe(res => {
        if (res == true) {
          this.route.navigate(['results'], {
            queryParams:
            {
              testCompleteStatus: 'completed',
              score: this.score,
              section: this.section,
              testNumber: this.testNumber
            }
          })
        }
      });
    })
  }


  onSubmitMarks() {
    const body = {
      username: localStorage.getItem('username'),
      testNumber: this.testNumber,
      section: this.section,
      marksBand: this.score,
    }
    this.apiService.insertMarks(body).subscribe(data => {
      if (data.status == 200) {
        return this.checkMarksStatus.next(true)
      }
    })
  }
}
