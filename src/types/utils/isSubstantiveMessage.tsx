import {
  Message,
  SubstantiveContent,
  MessageContent,
  SagaEvent,
  ChildMap,
} from "../events";

const isSubstantiveMessage = (evt: SagaEvent, childMap: ChildMap) =>
  ((evt as any).kind === "message" &&
    (evt as any).contents.some(
      ({ kind }: MessageContent) => SubstantiveContent.indexOf(kind) > -1
    )) ||
  childMap[evt.id].length > 0; // if it has a child it's substantive

export default isSubstantiveMessage;
