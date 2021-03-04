export interface IAchieve {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  }
  url: string;
  name: number;
  done: boolean;
}