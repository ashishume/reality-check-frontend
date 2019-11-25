import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { LoggingInterceptor } from './logging-interceptors';
// import { CachingInterceptor } from './caching-interceptors';
import { LoaderInterceptor } from './loader.interceptor';
import { HttpConfigInterceptor } from './httpConfigInterceptor';
// import { HttpConfigInterceptor } from './httpconfig.interceptor';

export const httpInterceptorProviders = [
    // { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
];
