import { UserInfo } from './user';
export interface ITask {
  id: number;
  user: {
    id: number;
    info: UserInfo;
  }
  begin_time: string;
  end_time: string;
  name: string;
  description: string;
  percentage: number;
}