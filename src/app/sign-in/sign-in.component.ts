import { Component, OnInit } from '@angular/core';
import { Account } from '../../dataobjects/Account';
import { ApiCaller } from '../../services/ApiCaller';
import { ApiVersion } from '../../dataobjects/ApiVersion';

// import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  apiCaller: ApiCaller;
  apiVersion: ApiVersion = {
    currentVersion : ''
  };

  account: Account = {
    displayName : '',
    password : '',
    username : ''
  };

  constructor(apiCaller: ApiCaller) {
    this.apiCaller = apiCaller;
  }

// router: Router;
  // constructor(router: Router) {
  //   this.router = router;
  // }

  ngOnInit() {
    // this.router.navigateByUrl('xxx');
    this.apiCaller.getVersionX().subscribe(
      data => { this.apiVersion = data; },
      err => console.error(err), () => console.log('version check api responded'));
    // console.log(this.apiVersion);
  }

  getVersion(): string {
    return this.apiVersion.currentVersion;
  }
}
