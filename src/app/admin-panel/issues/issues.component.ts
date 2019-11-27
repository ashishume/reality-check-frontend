import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  Issues;
  ngOnInit() {
    this.apiService.getRaisedIssues().subscribe(data => {
      if (data.status == 200)
        this.Issues = data.body;
      if (data.status == 204)
        this.Issues = [];
    })
  }

  issueResolved(issue) {
    const body = {
      id: issue._id
    }

    this.apiService.updateRaisedIssues(body).subscribe(data => {
      if (data.status == 200)
        this.ngOnInit()
    })
  }

}
