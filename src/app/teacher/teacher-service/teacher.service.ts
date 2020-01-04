import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor() { }

  chooseType = [
    "BUSINESS DEVELOPMENT ACTIVITIES",
    "LUNCH BREAK",
    "FREE LECTURE",
    "OFFLINE CLASS",
    "ONLINE CLASS"
  ]

  classType = [
    "ONLINE WRITING CLASS",
    "ONLINE SPEAKING CLASS",
    "ONLINE READING CLASS",
    "ONLINE DEMO CLASS",
    "FACULTY TRAINING CLASS",
    "ONLINE GRAMMAR CLASS",
    "ONLINE LISTENING CLASS"
  ]

  leaveTypes = [
    "SHORT LEAVE",
    "LONG LEAVE"
  ]

  years = [
    2019,
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
    2026
  ]
  months = [
    { monthName: "January", month: 1 },
    { monthName: "February", month: 2 },
    { monthName: "March", month: 3 },
    { monthName: "April", month: 4 },
    { monthName: "May", month: 5 },
    { monthName: "June", month: 6 },
    { monthName: "July", month: 7 },
    { monthName: "August", month: 8 },
    { monthName: "September", month: 9 },
    { monthName: "October", month: 10 },
    { monthName: "November", month: 11 },
    { monthName: "December", month: 12 },
  ]

  category = [
    "READING",
    "WRITING",
    "LISTENING",
    "SPEAKING",
    "MISCELLANEOUS",
  ]

  tags = [
    "GENERAL STUDENT",
    "ACADEMIC STUDENT",
    "TASK 1",
    "TASK 2",
  ]
}
