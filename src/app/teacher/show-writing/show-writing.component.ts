import { UploadAnswerSheetComponent } from './../upload-answer-sheet/upload-answer-sheet.component';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-show-writing',
  templateUrl: './show-writing.component.html',
  styleUrls: ['./show-writing.component.css']
})
export class ShowWritingComponent implements OnInit {

  constructor
    (private apiService: ApiService,
      public matDialog: MatDialog,
  ) {
  }
  studentDetails: any = [];
  imageUrl;
  pdfUrl;
  ngOnInit() {

    this.apiService.getWritingMarks().subscribe((data: any) => {
      if (data.status == 200) {
        this.studentDetails = data.body;
        this.studentDetails.forEach(result => {
          let arrayUrl = result.link.split(" ")
          result.imageUrl = arrayUrl[0];
          result.pdfUrl = arrayUrl[1];
        })
      } else if (data.status == 204)
        this.studentDetails = [];
    })
  }
  updateMarks(list) {
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.data = list;
    this.matDialog.open(UploadAnswerSheetComponent, matDialogConfig).afterClosed().subscribe(res => {
      if (res) {
        this.updateStudentTestData(res)
      }
    })
  }

  updateStudentTestData(body) {
    this.apiService.updateWritingMarks(body).subscribe(data => {
      if (data.status == 200)
        this.ngOnInit()
    })
  }

}
