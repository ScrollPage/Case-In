import { UserInfo } from './user';

export interface IMember {
  user: {
    id: number;
    info: UserInfo;
  }
}