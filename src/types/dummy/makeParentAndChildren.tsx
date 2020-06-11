import { Event } from "../events";
import correctBelowChain from "./correctBelowChain";
import uniqid from "uniqid";
import makeMessage from "./makeMessage";
export default (
  creatorID: string,
  parentMsg: string,
  children: Event[],
  parent: string | null,
  below: string | null
): Event[] => {
  const ids = children.map(() => uniqid());
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
      children.map((evt: Event) => ({
        ...evt,
        parent: parentID,
      })),
      null
    ),
  ];
};
