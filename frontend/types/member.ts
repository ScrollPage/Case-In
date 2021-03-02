import { UserInfo } from './user';

export interface IMember {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    info: UserInfo;
  }
}