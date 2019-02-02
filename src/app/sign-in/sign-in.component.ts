import { Component, OnInit } from '@angular/core';
import { Account } from '../../dataobjects/account';

// import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  account: Account = {
    displayName : '',
    password : '',
    username : ''
  };

  constructor() {
  }

// router: Router;
  // constructor(router: Router) {
  //   this.router = router;
  // }

  ngOnInit() {
    // this.router.navigateByUrl('xxx');
  }

}
