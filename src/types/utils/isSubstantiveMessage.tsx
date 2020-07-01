import {
  Message,
  SubstantiveContent,
  MessageContent,
  SagaEvent,
} from "../events";

const isSubstantiveMessage = (evt: SagaEvent) =>
  evt.kind === "message" &&
  evt.contents.some(
    ({ kind }: MessageContent) => SubstantiveContent.indexOf(kind) > -1
  );

export default isSubstantiveMessage;
