import { SagaEvent } from "../types/events";
import correctBelowChain from "./correctBelowChain";
import uniqid from "uniqid";
import makeMessage from "./makeMessage";
export default (
  creatorID: string,
  parentMsg: string,
  children: SagaEvent[],
  parent: string | null,
  below: string | null
): SagaEvent[] => {
  const parentID = uniqid();
  const parentMessage = makeMessage(
    creatorID,
    parentMsg,
    parent,
    below,
    parentID
  );
  return [
    parentMessage,
    ...correctBelowChain(
      children.map((evt: SagaEvent) => ({
        ...evt,
        parent: parentID,
      })),
      null
    ),
  ];
};
