import { Event } from "../events";

export default (events: Event[], below: string | null) =>
  events.map((evt: Event, idx: number) => ({
    ...evt,
    below: idx === 0 ? null : events[idx - 1].id,
  }));
