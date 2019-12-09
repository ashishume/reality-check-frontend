import { CalculateMarksService } from 'src/app/shared/services/calculate-marks/calculate-marks.service';
import { ApiService } from '../../shared/services/api-service/api.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AnswerHelperService } from '../shared/answer-helper/answer-helper.service';
import * as Rx from 'rxjs';
@Component({
  selector: 'app-listening',
  templateUrl: './listening.component.html',
  styleUrls: ['./listening.component.css']
})


export class ListeningComponent implements OnInit {

  constructor(
    private helper: AnswerHelperService,
    private calculate: CalculateMarksService,
    private router: ActivatedRoute,
    private route: Router,
    private apiService: ApiService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Listening')
  }
  section;
  testNumber;
  answerDetails = []
  score;
  audioLink;
  userType = "Academic Student"
  checkMarksStatus = new Rx.Subject();
  pdfLink;
  ngOnInit() {

    this.router.queryParams.subscribe(params => {
      this.testNumber = params['testNumber'];
      this.section = params['section'];
    });


    this.getUrls()
    const ans = this.helper.getQuestionData()
    this.answerDetails = ans
  }

  getUrls() {
    const query = {
      studentType: this.userType
    }
    this.apiService.getTestDetails(query).subscribe(data => {
      data.body[0].testDetails.forEach(res => {
        if (this.testNumber == res.testNumber) {
          let array = res.listeningLink.split(" ")
          this.audioLink = array[0]
          this.pdfLink = array[1]

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