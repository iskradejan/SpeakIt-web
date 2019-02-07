import { Component, OnInit } from '@angular/core';
import { ApiCaller } from '../../services/ApiCaller';
import { ApiException } from '../../dataobjects/ApiException';
import { CookieManager } from '../../services/CookieManager';
import { Post } from '../../dataobjects/Post';
import { DataHolder } from '../../services/DataHolder';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  apiErrorMessage = '';
  apiException = new ApiException();

  posts:Post[];

  constructor(private apiCaller: ApiCaller, private cookieManager: CookieManager, private dataHolder: DataHolder) {}

  ngOnInit() {
    this.apiCaller.fetchAllPosts().subscribe(
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

  showApiError(): string {
    return this.apiErrorMessage;
  }
}

function elapsedTime(date) {
  return (new Date(date)).toLocaleString();
}
