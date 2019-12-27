import { ErrorServiceService } from './../../shared/services/error-service/error-service.service';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {


  darkTheme: NgxMaterialTimepickerTheme = {
    dial: {
      dialBackgroundColor: '#E5918E',
    },
    clockFace: {
      clockHandColor: '#E5918E',
    }
  };

  public AttendanceFormGroup: FormGroup;
  private todayDate: Date = new Date();
  maxDate;
  minDate;
  attendanceInfo;
  show = false;
  currentDate;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private notify: ErrorServiceService
  ) {
    this.AttendanceFormGroup = this.fb.group(
      {
        // date: new FormControl('', [Validators.required]),
        message: new FormControl('', [Validators.required]),
        isPresent: new FormControl(false, []),
        time: new FormControl('', [Validators.required]),
      },
    )

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.AttendanceFormGroup.controls[controlName].hasError(errorName);
  }

  ngOnInit() {
  }


  onSubmitAttendance(form) {
    const formData = form.value

    const selectedDate = this.todayDate.getDate();
    const selectedMonth = this.todayDate.getMonth() + 1;
    const selectedYear = this.todayDate.getFullYear();

    const username = localStorage.getItem('username');
    const newDate = selectedDate + "-" + selectedMonth + "-" + selectedYear;
    const dateTime = newDate + "T" + formData.time;
    const body = {
      username: username,
      date: dateTime,
      isPresent: formData.isPresent,
      message: formData.message
    }

    this.apiService.submitAttendance(body).subscribe(response => {
      if (response.status == 200)
        this.notify.showError("Attendance Marked")
      this.ngOnInit()
    })
  }


  getAttendanceData(date) {
    const newDate = new Date(date);
    const currentDay = newDate.getDate();
    const currentMonth = newDate.getMonth() + 1;
    const currentYear = newDate.getFullYear();
    const currentDate = currentDay + "-" + currentMonth + "-" + currentYear;

    const query = {
      date: currentDate,
      username: localStorage.getItem('username')
    }

    this.apiService.getAttendanceDate(query).subscribe(res => {
      if (res.status == 200) {
        let attendanceInfo = []
        this.currentDate = res.body[0].date;
        res.body[0].attendanceData.forEach(value => {
          attendanceInfo.push(value)
        })
        this.attendanceInfo = attendanceInfo;

      }
    })

  }


}
