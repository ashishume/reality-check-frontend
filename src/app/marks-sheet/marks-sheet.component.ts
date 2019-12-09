import { AnswerHelperService } from 'src/app/section/shared/answer-helper/answer-helper.service';
import { ApiService } from './../shared/services/api-service/api.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-marks-sheet',
  templateUrl: './marks-sheet.component.html',
  styleUrls: ['./marks-sheet.component.css']
})
export class MarksSheetComponent implements OnInit {

  query;
  constructor(private apiService: ApiService,
    private helper: AnswerHelperService,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Marks Sheet')

  }

  // @ViewChild('content') content: ElementRef
  marksDetails = []
  UploadMarksDetails = [];
  countOfTests = [];
  testNumber;
  imageUrl: string;
  name: string;
  email: string;
  studentType: string;
  averageScore: number;
  params = {};
  ngOnInit() {
    this.query = {
      username: localStorage.getItem('username')
    }

    this.showDocumentScores()
    this.countOfTests = this.helper.getTestNumber()
  }


  showResult(test) {

    let marksArray = []
    this.apiService.getMarksDetails(this.query).subscribe(data => {
      if (data.status == 200) {
        data.body.forEach(res => {
          if (test == res.testNumber) {
            marksArray.push(res)
          }
        })
        this.marksDetails = marksArray;
      }

    })
  }

  showDocumentScores() {

    this.apiService.getWritingMarksUserName(this.query).subscribe(data => {
      if (data.status == 200)
        this.UploadMarksDetails = data.body;
      this.UploadMarksDetails.forEach(result => {
        let arrayUrl = result.link.split(" ")
        result.imageUrl = arrayUrl[0];
        result.pdfUrl = arrayUrl[1];
      })

    })


  }


}
