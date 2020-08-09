import { Message } from "../types/events";

const messageDummy: Message = {
  kind: "message",
  parent: null,
  below: null,
  seen_by: ["m"],
  creator: "m",
  created: new Date().getTime(),
  id: "asdf",
  contents: [
    {
      kind: "markdown",
      contents: "Our conversations have a memory problem",
    },
  ],
};

export default messageDummy;
