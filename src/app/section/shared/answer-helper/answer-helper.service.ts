import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AnswerHelperService {

  constructor(private apiService: ApiService) { }
  getUserDetails = new Rx.Subject();
  getUsers() {
    this.apiService.fetchStudentDetails().subscribe(data => {
      return this.getUserDetails.next(data.body);
    })
  }

  getQuestionData() {
    let questionArray = []
    for (let i = 1; i <= 40; i++) {
      questionArray.push({
        QNumber: i,
        QValue: ''
      })
    }
    return questionArray;
  }
  getQuestionAnswerData() {
    let questionArray = []
    for (let i = 1; i <= 40; i++) {
      questionArray.push({
        questionNumber: i,
        correctAnswer: ''
      })
    }
    return questionArray;
  }
  getTestNumber() {
    let testArray = []
    for (let i = 1; i <= 12; i++) {
      testArray.push(i)
    }
    return testArray;
  }
  getSectionDetails() {
    let tempArray = [
      "Reading",
      "Listening",
      "Speaking",
      "Writing",
    ]
    return tempArray;
  }

  getLinkSectionDetails() {
    let tempArray = [
      { value: "listeningLink", display: "Listening" },
      { value: "readingLink", display: "Reading" },
      { value: "documentWritingLink", display: "Document Upload (Writing)" },
      { value: "writing", display: "Computerized Typing" }
    ]
    return tempArray;
  }

  getUserTypes() {
    return [
      "General Student",
      "Academic Student",
      "Admin",
      "Teacher",
    ]
  }

  getStudentTypes() {
    return [
      "Academic Student",
      "General Student"
    ]
  }
}
