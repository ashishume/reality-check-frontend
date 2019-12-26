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
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.minDate = this.todayDate.toJSON('yyyy-MM-dd');
    this.maxDate = new Date(
      this.todayDate.getFullYear(),
      this.todayDate.getMonth(),
      this.todayDate.getDate() + 7
    );

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
    const query = {
      username: localStorage.getItem('username')
    }
    this.apiService.getAttendanceData(query).subscribe(response => {
      if (response.status == 200) {
        // console.log(response.body);

        let attendanceData = []
        this.attendanceInfo = response.body.info;
        response.body.info.forEach(value => {
          value.attendanceData.forEach(info => {
            info.visible = false;
          })
          attendanceData.push(value);
        })
        this.attendanceInfo = attendanceData;
        console.log(this.attendanceInfo);

      }
    })
  }


  onSubmitAttendance(form) {
    const formData = form.value

    const selectedDate = this.todayDate.getDate();
    const selectedMonth = this.todayDate.getMonth() + 1;
    const selectedYear = this.todayDate.getFullYear();

    const username = localStorage.getItem('username');
    const newDate = selectedDate + "-" + selectedMonth + "-" + selectedYear;
    const dateTime = newDate + "T" + formData.time;
    // const dateTime = "28-12-2019" + "T" + formData.time;
    const body = {
      username: username,
      date: dateTime,
      isPresent: formData.isPresent,
      message: formData.message
    }

    this.apiService.submitAttendance(body).subscribe(response => {
      if (response.status == 200)
        this.ngOnInit()
    })

  }
}
