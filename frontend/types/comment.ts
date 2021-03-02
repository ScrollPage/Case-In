export interface IComment {
  id: number;
  timestamp: string;
  content: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  }
}