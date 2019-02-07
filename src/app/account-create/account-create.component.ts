import { Component, OnInit } from '@angular/core';
import { Account } from '../../dataobjects/Account';
import { ApiCaller } from '../../services/ApiCaller';
import { Session } from '../../dataobjects/Session';
import { ApiException } from '../../dataobjects/ApiException';
import { CookieManager } from '../../services/CookieManager';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {

  apiException = new ApiException();
  session = new Session();

  apiErrorMessage = '';

  account = new Account();

  constructor(private apiCaller: ApiCaller, private cookieManager: CookieManager) {}

  ngOnInit() {

  }

  submitForm(username:string, password:string, displayName:string) {
    this.account.username = username;
    this.account.password = password;
    this.account.displayName = displayName;

    this.createAccount(this.account);
  }

  createAccount(account:Account) {
    this.apiCaller.createAccount(account)
      .subscribe(
        data => { this.createAccountResponseSuccess(account);},
        error => { this.apiException = error.error[0]; this.createAccountResponseFail();}
      );
  }

  createAccountResponseSuccess(account:Account) {
    this.loginIn(account)
  }

  createAccountResponseFail() {
    if(this.apiException.code === 3) {
      this.apiErrorMessage = 'Invalid format'
    } else if(this.apiException.code === 4) {
      this.apiErrorMessage = 'Username is already taken.'
    } else if(this.apiException.code === 5) {
      this.apiErrorMessage = 'Display Name is already taken.'
    } else {
      this.apiErrorMessage = 'There was an unexpected error. Try again.'
    }
  }

  showApiError(): string {
    return this.apiErrorMessage;
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
}
