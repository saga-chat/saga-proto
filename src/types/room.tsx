import Entity from "./entity";
import { Event } from "./events";

export interface Room extends Entity {
  members: string[];
  name: string | null;
  events: Event[];
}
