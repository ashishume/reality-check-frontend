import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as Rx from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { ErrorServiceService } from '../error-service/error-service.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    private isConnected = true;
    public serverStatus = new Rx.Subject();

    constructor(
        public errorDialogBoxService: ErrorServiceService,
        private route: Router,
        public authService: AuthService,
        private location: Location,
    ) {

    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                headers: request.headers.set('Content-Type', 'application/json')
            });
        }
        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this.errorDialogBoxService.showError(error.error.message)
                return throwError(error.statusText);
            })
        );
    }
}
