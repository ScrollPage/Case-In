export interface UserInfo {
  first_name: string;
  last_name: string;
  phone_number: string;
  birth_date: string;
}

export interface User {
  id: number;
  email: string;
  is_superuser: boolean;
  has_chat: boolean;
  chat_id?: number;
  num_reviews: number;
  info: UserInfo;
  rate?: string;
}