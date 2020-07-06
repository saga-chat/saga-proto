import {
  Message,
  SubstantiveContent,
  MessageContent,
  SagaEvent,
  TreeEvt,
} from "../events";

const isSubstantiveMessage = (evt: TreeEvt) =>
  ((evt as any).kind === "message" &&
    (evt as any).contents.some(
      ({ kind }: MessageContent) => SubstantiveContent.indexOf(kind) > -1
    )) ||
  evt.children.length > 0;

export default isSubstantiveMessage;
