import { Component, OnInit } from '@angular/core';
import { ApiCaller } from '../../services/ApiCaller';
import { ApiException } from '../../dataobjects/ApiException';
import { CookieManager } from '../../services/CookieManager';
import { Post } from '../../dataobjects/Post';
import { HttpHeaders } from '@angular/common/http';
import {DataHolder} from '../../services/DataHolder';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  apiCaller: ApiCaller;
  cookieManager: CookieManager;
  dataHolder: DataHolder;

  apiErrorMessage = '';
  apiException = new ApiException();

  posts:Post[];

  constructor(apiCaller: ApiCaller, cookieManager: CookieManager, dataHolder: DataHolder) {
    this.apiCaller = apiCaller;
    this.cookieManager = cookieManager;
    this.dataHolder = dataHolder;
  }

  ngOnInit() {
    this.apiCaller.fetchAllPosts(new HttpHeaders({ 'sessionToken': this.cookieManager.getCookie() })).subscribe(
      data => { this.posts = data.body; this.dataHolder.posts = this.posts;},
      error => { this.apiException = error.error[0]; this.postsResponseFail();}
    );
  }

  postsResponseFail() {
    this.apiErrorMessage = 'Something went really wrong!!!'
  }

  formatDate(date:string): string {
    return elapsedTime(date);
  }
}

function elapsedTime(date) {
  return (new Date(date)).toLocaleString();
}
