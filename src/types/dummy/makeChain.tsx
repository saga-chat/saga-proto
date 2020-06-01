import { Message } from "../events";
import uniqid from "uniqid";
export default (
  creatorID: string,
  messages: string[],
  parent: string | null,
  below: string | null
): Message[] => {
  const ids = messages.map(() => uniqid());
  return messages.map((msg: string, index: number) => ({
    kind: "message",
    parent,
    below: index === 0 ? below : ids[index - 1],
    seen_by: [creatorID],
    creator: creatorID,
    created: new Date().getTime(),
    id: ids[index],
    contents: [
      {
        kind: "markdown",
        contents: msg,
      },
    ],
  }));
};
