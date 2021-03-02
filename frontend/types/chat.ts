import { UserInfo } from "./user";

export interface IChatMember {
  id: number;
  first_name: string;
  last_name: string;
  info: UserInfo;
}

export interface IChat {
  id: number;
  members: IChatMember[];
  name: string;
  is_chat: boolean;
  depart: number;
}