import { Message } from "../events";
import uniqid from "uniqid";

export default (
  creatorID: string,
  uri: string,
  parent: string | null,
  below: string | null,
  messageText: string = "",
  id: string = uniqid()
): Message => ({
  kind: "message",
  parent,
  below,
  seen_by: [creatorID],
  creator: creatorID,
  created: new Date().getTime(),
  id,
  contents:
    messageText !== ""
      ? [
          {
            kind: "image",
            uri,
          },
          {
            kind: "markdown",
            contents: messageText,
          },
        ]
      : [{ kind: "image", uri }],
});
