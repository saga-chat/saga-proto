import { Message, Event } from "../events";
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
    ...children.map((evt: Event, index: number) => ({
      ...evt,
      id: ids[index],
      below: index === 0 ? null : ids[index],
      parent: parentID,
    })),
  ];
};
