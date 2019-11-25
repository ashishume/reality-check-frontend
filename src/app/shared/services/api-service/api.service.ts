import { HttpService } from '../http-service/http.service';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Router } from '@angular/router';
import { ErrorServiceService } from '../error-service/error-service.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  testNumber = 0;
  paymentStatus;
  listOfTestDetails;
  constructor(
    private httpService: HttpService,
    private snack: ErrorServiceService) { }

  login(body) {
    return this.httpService.callApi('POST', body, 'users/login', '');
  }
  createUser(body) {
    return this.httpService.callApi('POST', body, 'users', '');
  }

  getUserDetails() {
    return this.httpService.callApi('GET', '', 'users', '');
  }
  editUserDetails(body) {
    return this.httpService.callApi('PUT', body, 'users', '');
  }
  deleteUser(params) {
    return this.httpService.callApi('DELETEBYPARAMS', '', 'users', params);
  }
  //*************USER APIs */

  getTestDetails() {
    return this.httpService.callApi('GET', '', 'tests', '');
  }
  insertTestAnswers(body) {
    return this.httpService.callApi('POST', body, 'answers', '');
  }

  updateTestAnswers(body) {
    return this.httpService.callApi('PUT', body, 'answers', '');
  }
  getAnswers(query) {
    return this.httpService.callApi('GETBYPARAMS', '', 'answers', query);
  }
  deleteAnswers(query) {
    return this.httpService.callApi('DELETEBYPARAMS', '', 'answers', query);
  }

  updateTestLinks(body) {
    return this.httpService.callApi('PUT', body, 'tests', '');
  }
  insertTestLinks(body) {
    return this.httpService.callApi('POST', body, 'tests', '');
  }
  getSectionLink() {
    return this.httpService.callApi('GET', '', 'tests', '');
  }

  //Writing
  insertWritingData(body) {
    return this.httpService.callApi('POST', body, 'writing', '');
  }
  getWritingMarks() {
    return this.httpService.callApi('GET', '', 'writing', '');
  }
  getWritingMarksUserName(query) {
    return this.httpService.callApi('GETBYPARAMS', '', 'writing/user', query);
  }
  updateWritingMarks(body) {
    return this.httpService.callApi('PUT', body, 'writing', '');
  }

  //MARKS
  insertMarks(body) {
    return this.httpService.callApi('POST', body, 'marks', '');
  }
  getMarksDetails(query) {
    return this.httpService.callApi('GETBYPARAMS', '', 'marks', query);
  }
  updateMarks(body) {
    return this.httpService.callApi('PUT', body, 'marks', '');
  }

  //ISSUES
  raiseIssue(body) {
    return this.httpService.callApi('POST', body, 'issues', '');
  }
  getRaisedIssues() {
    return this.httpService.callApi('GET', '', 'issues', '');
  }
  updateRaisedIssues(body) {
    return this.httpService.callApi('PUT', body, 'issues', '');
  }
  getAnalysisData(query) {
    return this.httpService.callApi('GETBYPARAMS', '', 'marks/average', query)
  }



  // ---------------------------NEW APIs-----------------------































  // updateUserType(body) {
  //   return this.httpService.callApi('PUT', body, 'user/updateUserType', '')
  // }
  // // ******************************************

  // getListOfQuestions(query) {
  //   return this.httpService.callApi('GETBYPARAMS', '', 'questions/listQuestions', query);
  // }
  // insertQuestion(body) {
  //   return this.httpService.callApi('POST', body, 'questions/addQuestion', '');
  // }
  // updateQuestion(body) {
  //   return this.httpService.callApi('PUT', body, 'questions/updateQuestion', '');
  // }

  // // ******************************************

  // // ******************************************
  // insertParagraph(body) {
  //   return this.httpService.callApi('POST', body, 'contents/addParagraph', '');
  // }
  // deleteQuestion(params) {
  //   return this.httpService.callApi('DELETEBYPARAMS', '', 'questions/deleteQuestion', params);
  // }
  // getListOfParagraph(query) {
  //   return this.httpService.callApi('GETBYPARAMS', '', 'contents/listParagraph', query);
  // }
  // updateParagraph(body) {
  //   return this.httpService.callApi('PUT', body, 'contents/updateParagraph', '');
  // }
  // deleteParagraph(param) {
  //   return this.httpService.callApi('DELETEBYPARAMS', '', 'contents/deleteParagraph', param);
  // }

  // // ******************************************

  // getProfileDetails(query) {
  //   return this.httpService.callApi('GETBYPARAMS', '', 'user', query);
  // }
  // getProfileDetailsOnUserId(query) {
  //   return this.httpService.callApi('GETBYPARAMS', '', 'user/userId', query);
  // }

  // addTestData(body) {
  //   return this.httpService.callApi('POST', body, 'tests/addTests', '');
  // }
  // updateTestData(body) {
  //   return this.httpService.callApi('PUT', body, 'tests/updateTests', '');
  // }
  // changeTestStatus(body) {
  //   return this.httpService.callApi('PUT', body, 'tests/changeTestStatus', '');
  // }

  // showTestData(query) {
  //   return this.httpService.callApi('GETBYPARAMS', '', 'tests/listTests', query);
  // }
  // listAllUsers() {
  //   return this.httpService.callApi('GET', '', 'user/listUsers', '');
  // }
  // setPaymentStatus(body) {
  //   return this.httpService.callApi('PUT', body, 'user/paymentStatus', '');
  // }

  // submitWritingAnswer(body) {
  //   return this.httpService.callApi('POST', body, 'contents/writingAnswer', '');
  // }

  // showWritingAnswers() {
  //   return this.httpService.callApi('GET', '', 'contents/showAnswer', '');
  // }


  // insertOnlineTest(body) {
  //   return this.httpService.callApi('POST', body, 'contents/onlineWriting', '');
  // }
  // displayOnlineTestDetails() {
  //   return this.httpService.callApi('GET', '', 'contents/showOnline', '');
  // }
  // updateOnlineTest(body) {
  //   return this.httpService.callApi('PUT', body, 'contents/updateAnswer', '');
  // }

  // //SEND MAIL
  // sendEmail(body) {
  //   return this.httpService.callApi('POST', body, 'user/sendEmail', '')
  // }

  // insertMarkSheet(body) {
  //   return this.httpService.callApi('POST', body, 'marks/addMarks', '')
  // }
  // displayMarksSheet(params) {
  //   return this.httpService.callApi('GETBYPARAMS', '', 'marks/showMarks', params)
  // }
  // displaySectionMarks(params) {
  //   return this.httpService.callApi('GETBYPARAMS', '', 'marks/showSectionDetails', params)
  // }

  // insertIssue(body) {
  //   return this.httpService.callApi('POST', body, 'issue/addIssue', '')
  // }
  // displayIssue() {
  //   return this.httpService.callApi('GET', '', 'issue/showIssues', '')
  // }
  // updateIssue(body) {
  //   return this.httpService.callApi('PUT', body, 'issue/updateIssues', '')
  // }

  // getAnalysisData(query) {
  //   return this.httpService.callApi('GETBYPARAMS', '', 'marks/average', query)
  // }

  // makePayment(body) {
  //   return this.httpService.callApi('POST', body, 'payment/makePayment', '')
  // }

  // addPaymentData(body) {
  //   return this.httpService.callApi('POST', body, 'payment/addPayment', '')
  // }
  // showPaymentDetails(query) {
  //   return this.httpService.callApi('GETBYPARAMS', '', 'payment/showPayment', query)
  // }







  ////TO CHECK WHETHER THE TEST IS ALREADY GIVEN OR NOT
  // checkTestStatus() {
  //   const query = {
  //     email: localStorage.getItem('email')
  //   }
  //   const object = new Rx.Observable(observer => {
  //     this.showTestData(query).subscribe((data: any) => {
  //       data.body.testDetails.forEach(element => {
  //         if (element.testNumber == parseInt(localStorage.getItem('testNumber')))
  //           observer.next(element);
  //       });
  //     });
  //   });
  //   return object;

  // }

  //TO UPDATE TEST STATUS
  // updateTestStatus(section) {
  //   let updateBody = {
  //     email: localStorage.getItem('email'),
  //     testNumber: parseInt(localStorage.getItem('testNumber')),
  //     testStatusUpdate: ""
  //   }
  //   updateBody.testStatusUpdate = section;
  //   this.updateTestData(updateBody).subscribe((data: any) => {
  //     if (data.status == 200) {
  //       this.snack.showError("Your test has been successfully submitted")
  //       // this.route.navigate(['res'])
  //     }
  //   })
  // }



  //common data for components
  // getStudentTypes() {
  //   let paragraphUserType = [
  //     "Academic Students",
  //     "General Students",
  //     // "Teacher",
  //     // "Admin"
  //   ]
  //   return paragraphUserType;
  // }
  // getUserTypes() {
  //   let userType = [
  //     "Academic Students",
  //     "General Students",
  //     "Teacher",
  //     "Admin"
  //   ]
  //   return userType;
  // }
  // getSectionCategory() {
  //   let sectionCategory = [
  //     "Reading",
  //     "Writing",
  //     "Listening",
  //     "Speaking"
  //   ]
  //   return sectionCategory;
  // }
  // getQuestionTypes() {
  //   let listOfQuestionTypes = [
  //     "Type in the blanks", "Select in the blanks"
  //   ]
  //   return listOfQuestionTypes;
  // }
  // getCountOfSection() {
  //   let section = [
  //     1, 2, 3, 4
  //   ]
  //   return section;
  // }

  // dataItemObject;
  // passDataValues(data) {
  //   this.dataItemObject = data;
  // }
  // returnDataValues() {
  //   return this.dataItemObject;
  // }

  // numberOfTests() {
  //   let tempArray = []
  //   for (let i = 1; i <= 32; i++) {
  //     tempArray.push(i);
  //   }
  //   return tempArray;
  // }

}
