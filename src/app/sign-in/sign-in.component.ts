import { Component, OnInit } from '@angular/core';
import { Account } from '../../dataobjects/Account';
import { ApiCaller } from '../../services/ApiCaller';
import { Session } from '../../dataobjects/Session';
import { ApiException } from '../../dataobjects/ApiException';
import { CookieManager } from '../../services/CookieManager';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  apiCaller: ApiCaller;
  cookieManager: CookieManager;

  apiException = new ApiException();
  session = new Session();

  apiErrorMessage = '';

  account = new Account();

  constructor(apiCaller: ApiCaller, cookieManager: CookieManager) {
    this.apiCaller = apiCaller;
    this.cookieManager = cookieManager;
  }

  ngOnInit() {

  }

  submitForm(username:string, password:string) {
    this.account.username = username;
    this.account.password = password;
    this.loginIn(this.account);
  }

  loginIn(account:Account) {
    this.apiCaller.login(account)
      .subscribe(
        data => { this.session = data.body; this.loginResponseSuccess();},
        error => { this.apiException = error.error[0]; this.loginResponseFail();}
      );
  }

  loginResponseSuccess() {
    this.cookieManager.setCookie(this.session.token);
  }

  loginResponseFail() {
    if(this.apiException.code === 3) {
      this.apiErrorMessage = 'Invalid format'
    } else if(this.apiException.code === 2) {
      this.apiErrorMessage = 'Username not found'
    } else if(this.apiException.code === 1) {
      this.apiErrorMessage = 'Invalid credentials'
    } else {
      this.apiErrorMessage = 'There was an unexpected error. Try again.'
    }
  }

  showApiError(): string {
    return this.apiErrorMessage;
  }
}
