import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Post } from '../../../dataobjects/Post';
import { DataHolder } from '../../../services/DataHolder';
import { ApiCaller } from '../../../services/ApiCaller';
import { ApiException } from '../../../dataobjects/ApiException';
import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  apiErrorMessage = '';
  apiException = new ApiException();

  post:Post;

  constructor(private router:Router, private route: ActivatedRoute, private dataHolder: DataHolder, private apiCaller: ApiCaller) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.post = this.getPost(params.get('id'));
    });
  }

  private getPost(id): Post {
    if(typeof this.dataHolder.posts == 'undefined') {
      this.apiCaller.fetchPostById(id).subscribe(
        data => { this.post = data.body; return this.post; },
        error => { this.apiException = error.error[0]; this.postsResponseFail(); }
      );
    } else {
      return this.dataHolder.posts.find(post => post.id == id);
    }
  }

  postsResponseFail() {
    if(this.apiException.code == 1) {
      this.router.navigateByUrl('/sign-in')
    }
    this.apiErrorMessage = 'Something went really wrong!!!'
  }

  formatDate(date:string): string {
    return moment(date).fromNow();
  }

  showApiError(): string {

    return this.apiErrorMessage;
  }
}

function elapsedTime(date) {
  return (new Date(date)).toLocaleString();
}
