import { Component, OnInit } from '@angular/core';
import { Account } from '../../dataobjects/account';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {

  account: Account = {
    displayName : '',
    password : '',
    username : ''
  };

  constructor() { }

  ngOnInit() {
  }

}
