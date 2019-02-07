import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Post } from '../../../dataobjects/Post';
import { DataHolder } from '../../../services/DataHolder';
import { ApiCaller } from '../../../services/ApiCaller';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  apiErrorMessage = '';

  post:Post;

  constructor(private route: ActivatedRoute, private dataHolder: DataHolder, private apiCaller: ApiCaller) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.post = this.getPost(params.get('id'));
    });
  }

  private getPost(id): Post {
    if(typeof this.dataHolder.posts == 'undefined') {
      this.apiCaller.fetchPostById(id).subscribe(
        data => { this.post = data.body; return this.post },
        error => { this.apiErrorMessage = 'This post is experiencing some problems';}
      );
    } else {
      return this.dataHolder.posts.find(post => post.id == id);
    }
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
