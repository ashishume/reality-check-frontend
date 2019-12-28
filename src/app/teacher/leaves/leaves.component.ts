import { ErrorServiceService } from './../../shared/services/error-service/error-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { TeacherService } from './../teacher-service/teacher.service';
import { Component, OnInit } from '@angular/core';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  leaveTypes = [];
  checkLeaveType = false;
  leaves;
  months = []
  minDate;
  maxDate;
  years = [];
  public LeaveFormGroup: FormGroup;
  public LeaveSearchFormGroup: FormGroup;
  month;
  year;
  darkTheme: NgxMaterialTimepickerTheme = {
    dial: {
      dialBackgroundColor: '#E5918E',
    },
    clockFace: {
      clockHandColor: '#E5918E',
    }
  };
  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private apiService: ApiService,
    private notify: ErrorServiceService) {
    this.leaveTypes = this.teacherService.leaveTypes;
    this.years = this.teacherService.years;
    this.months = this.teacherService.months;




    this.LeaveFormGroup = this.fb.group(
      {
        message: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        leaveType: new FormControl('', [Validators.required]),
        startTime: new FormControl('', []),
        endTime: new FormControl('', []),
      },
    )
    this.LeaveSearchFormGroup = this.fb.group(
      {
        month: new FormControl('', [Validators.required]),
        year: new FormControl('', [Validators.required]),
      },
    )

  }


  checkLeaveData(leave) {
    if (leave == "SHORT LEAVE")
      this.checkLeaveType = true;
    else
      this.checkLeaveType = false;
  }


  ngOnInit() {
  }

  onSubmitLeave(LeaveForm) {
    let formData = LeaveForm.value;

    if (formData.leaveType == "LONG LEAVE" || formData.startTime == "" || formData.endTime == "") {
      formData.startTime = "N/A";
      formData.endTime = "N/A";
    }
    const newDate = new Date(formData.date);
    const selectedDate = newDate.getDate();
    const selectedMonth = newDate.getMonth() + 1;
    const selectedYear = newDate.getFullYear();
    const date = selectedDate + "-" + selectedMonth + "-" + selectedYear;
    formData.date = date;
    formData.username = localStorage.getItem('username');
    this.apiService.applyLeave(formData).subscribe(response => {
      if (response.status == 200) {
        this.notify.showError("You have successfully applied for leave")
      }
    })
  }

  onSearchLeave(form) {
    let formData = form.value;
    formData.username = localStorage.getItem('username');

    this.apiService.fetchLeaves(formData).subscribe(res => {
      if (res.status == 200) {
        this.leaves = res.body;
      }
    })

  }


}
