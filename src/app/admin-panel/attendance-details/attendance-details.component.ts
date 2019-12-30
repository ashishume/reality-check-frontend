import { Component, OnInit } from '@angular/core';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { TeacherService } from 'src/app/teacher/teacher-service/teacher.service';
import { ErrorServiceService } from 'src/app/shared/services/error-service/error-service.service';

@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.css']
})
export class AttendanceDetailsComponent implements OnInit {


  public AttendanceFormGroup: FormGroup;
  todayDate: Date = new Date();
  date;
  username;
  teachersList = [];
  attendanceInfo;
  currentDate;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private notify: ErrorServiceService
  ) {

    this.AttendanceFormGroup = this.fb.group(
      {
        date: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
      },
    )
  }

  ngOnInit() {

    this.apiService.fetchTeacherDetails().subscribe(res => {
      if (res.status == 200)
        this.teachersList = res.body;
    })


    // this.getAttendanceData();
  }

  searchAttendance(form) {

    let formData = form.value;
    const newDate = new Date(formData.date);
    const currentDay = newDate.getDate();
    const currentMonth = newDate.getMonth() + 1;
    const currentYear = newDate.getFullYear();
    const currentDate = currentDay + "-" + currentMonth + "-" + currentYear;

    const query = {
      date: currentDate,
      username: formData.username
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
