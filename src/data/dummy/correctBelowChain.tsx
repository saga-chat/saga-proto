import { SagaEvent } from "../types/events";

export default (events: SagaEvent[], below: string | null) =>
  events.map((evt: SagaEvent, idx: number) => ({
    ...evt,
    below: idx === 0 ? below : events[idx - 1].id,
  }));
