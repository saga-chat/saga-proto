import { Message } from "../events";
import makeMessage from "./makeMessage";
import uniqid from "uniqid";
export default (
  creatorID: string,
  messages: string[],
  parent: string | null,
  below: string | null
): Message[] => {
  const ids = messages.map(() => uniqid());
  return messages.map((msg: string, index: number) =>
    makeMessage(
      creatorID,
      msg,
      parent,
      index === 0 ? below : ids[index - 1],
      ids[index]
    )
  );
};
