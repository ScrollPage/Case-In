export interface UserInfo {
  phone_number: string;
  birth_date: string;
  hobby: string;
  about: string;
  position: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  has_chat: boolean;
  chat_id?: number;
  num_reviews: number;
  info: UserInfo;
  rate?: string;
  mentor: {
    id: number;
    first_name: string;
    last_name: string;
  };
  achieve: number;
  total_achieve: number;
}