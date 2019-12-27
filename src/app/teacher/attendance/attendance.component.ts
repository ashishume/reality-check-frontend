import { TeacherService } from './../teacher-service/teacher.service';
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
  todayDate: Date = new Date();
  maxDate;
  minDate;
  date;
  attendanceInfo;
  checkChooseType = false;
  show = false;
  currentDate;
  chooseTypes = [];
  classTypes = [];
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private teacherService: TeacherService,
    private notify: ErrorServiceService
  ) {

    this.chooseTypes = this.teacherService.chooseType;
    this.classTypes = this.teacherService.classType;
    this.AttendanceFormGroup = this.fb.group(
      {
        chooseType: new FormControl('', [Validators.required]),
        classType: new FormControl('', []),
        message: new FormControl('', [Validators.required]),
        studentName: new FormControl('', []),
        startTime: new FormControl('', [Validators.required]),
        endTime: new FormControl('', [Validators.required]),
      },
    )

  }


  checkChooseData(choose) {
    if (choose == "ONLINE CLASS") {
      this.checkChooseType = true;
    } else {
      this.checkChooseType = false;
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.AttendanceFormGroup.controls[controlName].hasError(errorName);
  }

  ngOnInit() {
    this.getAttendanceData();
  }


  onSubmitAttendance(form) {
    const formData = form.value

    const selectedDate = this.todayDate.getDate();
    const selectedMonth = this.todayDate.getMonth() + 1;
    const selectedYear = this.todayDate.getFullYear();

    const username = localStorage.getItem('username');
    const newDate = selectedDate + "-" + selectedMonth + "-" + selectedYear;
    let studentName;
    let classType;
    if (formData.chooseType == "ONLINE CLASS") {
      studentName = formData.studentName;
      classType = formData.classType;
    } else {
      studentName = "";
      classType = ""
    }


    const body = {
      username: username,
      date: newDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      studentName: studentName,
      classType: classType,
      isPresent: true,
      chooseType: formData.chooseType,
      message: formData.message
    }


    this.apiService.submitAttendance(body).subscribe(response => {
      if (response.status == 200)
        this.notify.showError("Attendance Marked");
      this.getAttendanceData()
    })
  }


  getAttendanceData() {
    const newDate = new Date();
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
