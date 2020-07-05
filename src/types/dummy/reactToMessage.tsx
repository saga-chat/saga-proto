import { Message, Range } from "../events";
import uniqid from "uniqid";

export default (
  creatorID: string,
  message: Message,
  below: string | null,
  emoji: string,
  range: Range | null,
  id: string = uniqid()
): Message => ({
  kind: "message",
  parent: message.id,
  below,
  seen_by: [creatorID],
  creator: creatorID,
  created: new Date().getTime(),
  id,
  contents: [
    {
      kind: "reaction",
      emoji,
      range,
      contentIndex: 0,
      creator: creatorID,
      id: uniqid(),
      created: new Date().getTime(),
    },
  ],
});
