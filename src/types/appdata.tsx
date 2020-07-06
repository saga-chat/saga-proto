import { LocalUser, User } from "./user";
import { Room } from "./room";
import { Id } from "./entity";

export interface AppData {
  me: Id;
  myRooms: Id[];
  knownUsers: { [id: string]: User };
  knownRooms: { [id: string]: Room };
}
