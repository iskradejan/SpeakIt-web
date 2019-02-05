export class Post {
  id: number;
  title: string;
  body: string;
  user: Account;
  comments: Array<Comment>;
  createDate: string;

  constructor() {
  }
}
