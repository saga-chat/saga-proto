import { SagaEvent } from "../events";
import makeMessage from "./makeMessage";
import correctBelowChain from "./correctBelowChain";
export default (
  creatorID: string,
  messages: string[],
  parent: string | null,
  below: string | null
): SagaEvent[] => {
  return correctBelowChain(
    messages.map((msg: string) => makeMessage(creatorID, msg, parent, null)),
    below
  );
};
