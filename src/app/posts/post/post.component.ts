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

  post:Post;

  constructor(route: ActivatedRoute, dataHolder: DataHolder) {
    this.route = route;
    this.dataHolder = dataHolder;
  }

  ngOnInit() {
    console.log('xx');
    this.route.paramMap.subscribe(params => {
      console.log('qq');
      console.log(params.get('id'));
      this.post = this.getPost(params.get('id'));
      console.log('pp');
    });
  }

  private getPost(id): Post {
    console.log(id);
    console.log('sss');
    console.log(this.dataHolder.posts);
    return this.dataHolder.posts.find(post => post.id == id);
  }

  formatDate(date:string): string {
    return elapsedTime(date);
  }
}

function elapsedTime(date) {
  return (new Date(date)).toLocaleString();
}
