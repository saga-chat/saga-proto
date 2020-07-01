import { SagaEvent } from "../events";

// only works for top level
export default (events: SagaEvent[], below: string | null) =>
  events.map((evt: SagaEvent, idx: number) => ({
    ...evt,
    below: idx === 0 || evt.parent !== null ? below : events[idx - 1].id,
  }));
