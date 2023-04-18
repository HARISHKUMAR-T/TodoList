import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.url);
    console.log(request.url.includes('/api/v1/categories'));

    if(request.url.includes('/api/v1/categories')){
      console.log(true);

      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      console.log(headers);

      const newRequest=request.clone({headers:headers})
      console.log(newRequest);

      return next.handle(newRequest)
    }
    return next.handle(request);
  }
}
