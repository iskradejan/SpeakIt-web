import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../dataobjects/Post';
import {DataHolder} from '../../../services/DataHolder';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  route:ActivatedRoute;
  dataHolder:DataHolder;

  id;
  post:Post;

  constructor(route: ActivatedRoute, dataHolder: DataHolder) {
    this.route = route;
    this.dataHolder = dataHolder;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.post = this.getPost(this.id);
  }

  private getPost(id): Post {
    return this.dataHolder.posts.find(post => post.id == id);
  }

  formatDate(date:string): string {
    return elapsedTime(date);
  }
}

function elapsedTime(date) {
  return (new Date(date)).toLocaleString();
}
