import { Message, Embellishment, Range } from "../events";
import uniqid from "uniqid";

export default (
  creatorID: string,
  message: Message,
  below: string | null,
  emoji: string,
  range: Range | null,
  id: string = uniqid()
): Embellishment => ({
  kind: "embellishment",
  parent: message.id,
  below,
  seen_by: [creatorID],
  creator: creatorID,
  created: new Date().getTime(),
  id,
  contentIndex: 0,
  contents: [
    {
      kind: "reaction",
      emoji,
      range,
    },
  ],
});
