import { UserInfo } from './user';
export interface ICommand {
  id: number;
  admin: {
    id: number;
    info: UserInfo;
  }
  name: string;

  is_initiator: boolean;
  rate?: string;
  num_workers: number;
  joined: boolean;
  chat_id: number;
  membership_id: number;
  info: {
    id: number;
    description: string;
    motto: string;
  }
}