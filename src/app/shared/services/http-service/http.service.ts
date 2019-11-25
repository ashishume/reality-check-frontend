import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private Date;
  // public baseUrl = 'http://localhost:3000';
  public baseUrl = 'https://reality-check-app.herokuapp.com';
  constructor(private http: HttpClient) { }
  // **********************API CALLS*********************************

  public callApi(method: any, body: any, api: any, param: any): any {
    switch (method) {
      case 'POST':
        const postObserver = new Rx.Observable(observer => {
          this.post(body, api).subscribe(data => {
            observer.next(data);
          });
        });
        return postObserver;
      case 'GET':
        const getObserver = new Rx.Observable(observer => {
          this.get(api).subscribe(data => {
            observer.next(data);
          });
        });
        return getObserver;
      case 'PUT':
        const putObserver = new Rx.Observable(observer => {
          this.put(body, api).subscribe(data => {
            observer.next(data);
          });
        });
        return putObserver;

      case 'PUTBYPARAMS':
        const putParamsObserver = new Rx.Observable(observer => {
          this.putbyparams(param, api).subscribe(data => {
            observer.next(data);
          });
        });
        return putParamsObserver;
      case 'GETBYPARAMS':
        const getbyparams = new Rx.Observable(observer => {
          this.getbyparams(param, api).subscribe(data => {
            observer.next(data);
          });
        });
        return getbyparams;
      case 'DELETEBYPARAMS':
        const httpdelete = new Rx.Observable(observer => {
          this.deletebyparams(param, api).subscribe(data => {
            observer.next(data);
          });
        });
        return httpdelete;
    }
  }

  private post(body: any, api: any) {
    return this.http.post(`${this.baseUrl}/${api}`, body, { observe: 'response' });
  }

  private get(api: any) {
    return this.http.get(`${this.baseUrl}/${api}`, { observe: 'response' });
  }
  private put(body: any, api: any) {
    return this.http.put(`${this.baseUrl}/${api}`, body, { observe: 'response' });
  }

  private putbyparams(param: any, api: any) {
    return this.http.put(`${this.baseUrl}/${api}?${param}`, '', { observe: 'response' });
  }
  private getbyparams(param: any, api: any) {
    return this.http.get(`${this.baseUrl}/${api}`, { params: param, observe: 'response' });
  }
  private deletebyparams(param: any, api: any) {
    return this.http.delete(`${this.baseUrl}/${api}`, { params: param, observe: 'response' });
  }
}
