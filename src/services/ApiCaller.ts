import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../dataobjects/Account';
import {CookieManager} from './CookieManager';

@Injectable()
export class ApiCaller {
  constructor(private http: HttpClient, private cookieManager:CookieManager) { }

  private baseApiUrl = 'http://localhost:8080/api/';
  private loginUrl = this.baseApiUrl + 'auth/login';
  private createAccountUrl = this.baseApiUrl + 'account/';
  private allPostsUrl = this.baseApiUrl + 'post/';

  headers = new HttpHeaders({ 'sessionToken': this.cookieManager.getCookie() });

  // GET Example
  xxx(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.loginUrl, { observe: 'response' });
  }

  login(account: Account): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.loginUrl, account,{ observe: 'response' });
  }

  createAccount(account: Account): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.createAccountUrl, account,{ observe: 'response' });
  }

  fetchAllPosts(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.allPostsUrl,{ headers: this.headers, observe: 'response' });
  }

  fetchPostById(id: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.allPostsUrl + id,{ headers: this.headers, observe: 'response' });
  }
}
