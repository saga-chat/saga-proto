import Entity from "./entity";
import { Event } from "./events";

interface ILastTyping {
  parent: string;
  below: string;
  time: number;
}
export interface Room extends Entity {
  members: string[];
  name: string | null;
  events: Event[];
  lastTyping: Record<string, ILastTyping>;
}
