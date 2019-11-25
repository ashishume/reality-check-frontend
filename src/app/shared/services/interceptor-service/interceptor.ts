import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    console.log('INTERCEPTOR');
    // We retrieve the token, if any
    // const token = this.loginService.getAuthToken();
    let newHeaders = req.headers;
    // if (token) {
    //   // If we have a token, we append it to our new headers
    //   newHeaders = newHeaders.append('authtoken', token);
    // }
    // Finally we have to clone our request with our new headers
    // This is required because HttpRequests are immutable
    const authReq = req.clone({ headers: newHeaders });
    // Then we return an Observable that will run the request
    // or pass it to the next interceptor if any
    return next.handle(authReq);
  }
}

