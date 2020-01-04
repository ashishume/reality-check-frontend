import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/teacher/teacher-service/teacher.service';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { ErrorServiceService } from 'src/app/shared/services/error-service/error-service.service';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.css']
})
export class LeaveDetailsComponent implements OnInit {
  username;
  leaves;
  months = []
  years = [];
  public LeaveSearchFormGroup: FormGroup;
  month;
  year;
  teacherDetails = [];

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private apiService: ApiService,
    private notify: ErrorServiceService) {
    this.years = this.teacherService.years;
    this.months = this.teacherService.months;

    this.LeaveSearchFormGroup = this.fb.group(
      {
        month: new FormControl('', [Validators.required]),
        year: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
      },
    )

  }

  ngOnInit() {
    this.apiService.fetchTeacherDetails().subscribe(result => {
      if (result.status == 200)
        this.teacherDetails = result.body;
      else if (result.status == 204)
        this.teacherDetails = [];
    })
  }


  // username: req.query.username,
  // month: req.query.month,
  // year: req.query.year,

  onSearchLeave(form) {
    let formData = form.value;
    this.apiService.fetchLeaves(formData).subscribe(res => {
      if (res.status == 200) {
        this.leaves = res.body;
      }
      else if (res.status == 204)
        this.leaves = [];
    })
  }
}
