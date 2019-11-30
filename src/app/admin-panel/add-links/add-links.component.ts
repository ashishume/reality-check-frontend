import { UpdateLinksComponent } from './../update-links/update-links.component';
import { AnswerHelperService } from 'src/app/section/shared/answer-helper/answer-helper.service';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-add-links',
  templateUrl: './add-links.component.html',
  styleUrls: ['./add-links.component.css']
})
export class AddLinksComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
    private apiService: ApiService,
    private helper: AnswerHelperService) { }
  linkNames = [];
  testCount = [];
  link;
  testDetails = []
  testNumber;
  testName;
  studentTypes = [];
  changeType = "General Student"
  ngOnInit() {
    this.studentTypes = this.helper.getStudentTypes()
    this.getLinksData()
  }


  getLinksData() {
    const query = {
      studentType: this.changeType
    }
    console.log(query);

    this.apiService.getSectionLink(query).subscribe(data => {
      this.testDetails = data.body[0].testDetails;
      console.log(this.testDetails);

    })
  }

  dialogOpenHandler(body) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = body;
    dialogConfig.width = '500px'
    dialogConfig.height = '400px'
    dialogConfig.disableClose = true;

    const dialogRef = this.matDialog.open(UpdateLinksComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== false && result != "") {
        result.studentType=this.changeType
        this.apiService.updateTestLinks(result).subscribe(data => {
          if (data.status == 200) {
            this.getLinksData()
          }
        })
      }

    })

  }
  changeStudentType(type) {
    this.changeType = type;
    this.getLinksData()
  }

  onWritingEdit(testName, items) {
    const body = {
      testName: testName,
      testNumber: items.testNumber,
      link: items.documentWritingLink
    }

    this.dialogOpenHandler(body)
  }
  onReadingEdit(testName, items) {
    const body = {
      testName: testName,
      testNumber: items.testNumber,
      link: items.readingLink
    }
    this.dialogOpenHandler(body)
  }
  onListeningEdit(testName, items) {

    const body = {
      testName: testName,
      testNumber: items.testNumber,
      link: items.listeningLink
    }
    this.dialogOpenHandler(body)
  }


}
