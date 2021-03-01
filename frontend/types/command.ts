export interface ICommand {
  id: number;
  admin: number;
  name: string;
  members: any[];

  is_initiator: boolean;
  rate?: string;
  num_members: number;
  joined: boolean;
  chat_id: number;
  membership_id: number;
  info: {
    id: number;
    depart: string;
    description: string;
    motto: string;

    end_time?: string;
  }
}