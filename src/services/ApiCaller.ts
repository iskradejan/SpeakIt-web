import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../dataobjects/Account';

@Injectable()
export class ApiCaller {
  constructor(private http: HttpClient) { }

  private baseApiUrl = 'http://localhost:8080/api/';
  private loginUrl = this.baseApiUrl + 'auth/login';
  private createAccountUrl = this.baseApiUrl + 'account/';

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
}
