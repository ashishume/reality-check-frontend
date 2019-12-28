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

  getTestDetails(query) {
    return this.httpService.callApi('GETBYPARAMS', '', 'tests', query);
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
  getSectionLink(query) {
    return this.httpService.callApi('GETBYPARAMS', '', 'tests', query);
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



  //NEW FEATURES----------------------------------------------------------------------

  submitAttendance(body) {
    return this.httpService.callApi('POST', body, 'teacher', '')
  }

  getAttendanceData(query) {
    return this.httpService.callApi('GETBYPARAMS', '', 'teacher', query)
  }
  getAttendanceDate(query) {
    return this.httpService.callApi('GETBYPARAMS', '', 'teacher/date', query)
  }

  //LEAVES
  applyLeave(body) {
    return this.httpService.callApi('POST', body, 'leave', '')
  }
  fetchLeaves(query) {
    return this.httpService.callApi('GETBYPARAMS', '', 'leave', query)
  }

  //SHARED FILES
  shareFiles(body) {
    return this.httpService.callApi('POST', body, 'file', '')
  }
  fetchSharedFiles(query) {
    return this.httpService.callApi('GETBYPARAMS', '', 'file', query)
  }
  fetchOwnSharedFiles(query) {
    return this.httpService.callApi('GETBYPARAMS', '', 'file/shared', query)
  }

  //FETCH TEACHERS DETAILS
  fetchTeacherDetails() {
    return this.httpService.callApi('GET', '', 'users/teacher', '')
  }

  //FETCH TEACHERS DETAILS
  fetchStudentDetails() {
    return this.httpService.callApi('GET', '', 'users/student', '')
  }




}
