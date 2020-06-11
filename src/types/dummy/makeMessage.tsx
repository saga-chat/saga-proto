import { Message } from "../events";
import uniqid from "uniqid";

export default (
  creatorID: string,
  messageText: string,
  parent: string | null,
  below: string | null,
  id: string = uniqid()
): Message => ({
  kind: "message",
  parent,
  below,
  seen_by: [creatorID],
  creator: creatorID,
  created: new Date().getTime(),
  id,
  contents: [
    {
      kind: "markdown",
      contents: messageText,
    },
  ],
});
