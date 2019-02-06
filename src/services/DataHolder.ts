import { Injectable } from '@angular/core';
import {Post} from '../dataobjects/Post';

@Injectable()
export class DataHolder {
  posts: Post[];
}
