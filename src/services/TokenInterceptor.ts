import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { CookieManager } from './CookieManager';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public cookieManager: CookieManager) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!request.url.endsWith('auth/login')) {
      request = request.clone({
        setHeaders: {
          'sessionToken': this.cookieManager.getCookie()
        }
      });
    }
    return next.handle(request);
  }
}
