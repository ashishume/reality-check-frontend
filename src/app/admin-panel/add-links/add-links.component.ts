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
  ngOnInit() {
    // this.linkNames = this.helper.getLinkSectionDetails()
    // this.testCount = this.helper.getTestNumber()

    this.apiService.getSectionLink().subscribe(data => {
      this.testDetails = data.body.testDetails;

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
        this.apiService.updateTestLinks(result).subscribe(data => {
          if (data.status == 200) {
            this.ngOnInit()
          }
        })
      }

    })

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
