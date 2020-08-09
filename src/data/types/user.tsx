import { Id } from "./entity";

export interface User {
  created: number;
  id: Id;
  avatar: string;
  username: string;
  display_name: string;
}

export interface LocalUser extends User {
  rooms: Id[];
}
