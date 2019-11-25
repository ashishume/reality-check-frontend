import * as Rx from 'rxjs';
import { CalculateMarksService } from 'src/app/shared/services/calculate-marks/calculate-marks.service';
import { AnswerHelperService } from './../shared/answer-helper/answer-helper.service';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { NavbarService } from 'src/app/shared/services/navbar-service/navbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorServiceService } from 'src/app/shared/services/error-service/error-service.service';
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
    private apiService: ApiService
  ) { }

  answerDetails = []
  section;
  testNumber;
  score;
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

    this.apiService.getTestDetails().subscribe(data => {
      data.body.testDetails.forEach(res => {
        if (this.testNumber == res.testNumber) {
          this.pdfLink = res.readingLink
        }

      })
    })
  }


  onSubmitAnswerForm() {

    let tempArray = []
    this.answerDetails.forEach(result => {
      var value = result.QValue.toUpperCase().trim();
      tempArray.push({ questionNumber: result.QNumber, correctAnswer: value })
    })

    const body = {
      answers: tempArray,
      section: this.section,
      testNumber: parseInt(this.testNumber)
    }
    this.calculate.checkMarks(body).subscribe(data => {

      if (data) {
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
      }
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
