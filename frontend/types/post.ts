import { IComment } from "./comment";

export interface IPost {
  id: number;
  title?: string;
  num_likes: number;
  is_liked: boolean;
  depart: {
    id: number;
    name: string;
  }

  timestamp: string;

  picture?: string;
  num_comments: number;
  last_comment?: IComment;
}