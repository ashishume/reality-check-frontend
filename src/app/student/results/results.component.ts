import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { CalculateMarksService } from '../../shared/services/calculate-marks/calculate-marks.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from '../../shared/services/navbar-service/navbar.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  score;
  section;
  testNumber;
  viewAnswerDetails = [];
  displayAnswer = false;
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private apiService: ApiService
  ) {
    this.titleService.setTitle('Results')
    // this.navbarService.hide()

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.score = params['score'];
      this.testNumber = params['testNumber'];
      this.section = params['section'];
    });
  }
  showAnswers() {
    this.displayAnswer = true;
    const params = {
      section: this.section,
      testNumber: this.testNumber,
      studentType: localStorage.getItem('userType')
    }
    this.apiService.getAnswers(params).subscribe(data => {

      if (data.status == 200) {
        this.viewAnswerDetails = data.body[0].answers;
      }
      else if (data.status == 204)
        this.viewAnswerDetails = [];
    })
  }


}
