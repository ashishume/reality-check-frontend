import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-update-links',
  templateUrl: './update-links.component.html',
  styleUrls: ['./update-links.component.css']
})
export class UpdateLinksComponent implements OnInit {
  testName;
  testNumber;
  link;
  constructor(@Inject(MAT_DIALOG_DATA) data, private MatDialogRef: MatDialogRef<UpdateLinksComponent>) {
    if (data) {
      this.testName = data.testName;
      this.testNumber = data.testNumber;
      this.link = data.link;
    }

  }

  ngOnInit() {
  }

  onSubmitLinkButton() {
    if (this.link) {
      const body = {
        link: this.link,
        testNumber: this.testNumber,
        testName: this.testName
      }
      this.MatDialogRef.close(body)
    }
    else {
      this.MatDialogRef.close(false)
    }
  }

}
