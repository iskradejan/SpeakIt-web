import { Injectable } from '@angular/core';

@Injectable()
export class CookieManager {
  private appCookie = "spkit-sid";
  private appCookieExpiration = 59;

  setCookie = (cookieValue) => {
    var now = new Date();
    now.setMinutes(now.getMinutes() + this.appCookieExpiration);
    var expires = "expires=" + now.toUTCString();
    document.cookie = this.appCookie + "=" + cookieValue + ";" + expires + ";path=/";
  };

  getCookie = () => {
    var name = this.appCookie + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  };

  deleteCookie = (cookieValue) => {
    var now = new Date();
    now.setMinutes(now.getMinutes() - 999);
    var expires = "expires=" + now.toUTCString();
    document.cookie = this.appCookie + "=" + cookieValue + ";" + expires + ";path=/";
  };
}
