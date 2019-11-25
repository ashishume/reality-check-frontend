import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent implements OnInit {

  constructor(private route: Router, private matRef: MatDialogRef<InfoPageComponent>) { }

  ngOnInit() {
  }

  payment() {
    this.matRef.close()
    this.route.navigate(['payment'])
  }
  closeDialog() {
    this.matRef.close()
  }
}
