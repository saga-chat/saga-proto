import Entity from "./entity";
import { SagaEvent } from "./events";

interface ILastTyping {
  parent: string;
  below: string;
  time: number;
}
export interface Room extends Entity {
  members: string[];
  name: string | null;
  events: SagaEvent[];
  lastTyping: Record<string, ILastTyping>;
}
