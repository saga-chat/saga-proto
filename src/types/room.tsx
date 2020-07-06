import Entity, { Id } from "./entity";
import { SagaEvent } from "./events";

interface ILastTyping {
  parent: Id;
  below: Id;
  time: number;
}

export interface RoomMember {
  id: Id;
  online: boolean;
  lastTyping: ILastTyping | null;
}
export interface Room extends Entity {
  members: { [id: string]: RoomMember };
  name: string | null;
  events: SagaEvent[];
}
