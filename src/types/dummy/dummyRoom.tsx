import { Room } from "../room";
import uniqid from "uniqid";
import makeChain from "./makeChain";

const dummyRoom: Room = {
  creator: "max",
  created: Date.now(),
  id: uniqid(),
  members: ["max", "you"],
  name: "Telescope emoji",
  events: [
    ...makeChain(
      "max",
      [
        "Welcome to saga!",
        "here's a quick tour of all the features",
        "saga was built on the **vision** that chat should work like a notebook",
        "you can read more about this vision at https://a9.io/glue-comic",
        "anyways,",
      ],
      null,
      null
    ),
  ],
  lastTyping: {},
};
export default dummyRoom;
