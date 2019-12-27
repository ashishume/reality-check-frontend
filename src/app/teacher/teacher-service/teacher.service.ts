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

}
