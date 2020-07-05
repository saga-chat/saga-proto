import { Room } from "../room";
import uniqid from "uniqid";
import makeChain from "./makeChain";
import makeMessage from "./makeMessage";
import makeParentAndChildren from "./makeParentAndChildren";
import correctBelowChain from "./correctBelowChain";
import reactToMessage from "./reactToMessage";

const veryFirst = makeMessage("max", "**Intro to Saga**", null, null);
const hello = makeMessage("max", "Hello!", null, veryFirst.id);
const helloReaction = reactToMessage("max", hello, null, "😋", null);
const chain = makeChain(
  "max",
  [
    "Welcome to saga!",
    "here's a quick tour of all the features",
    "saga was built on the **vision** that chat should work like a notebook",
    "you can read more about this vision at https://a9.io/glue-comic",
    "anyways,",
  ],
  null,
  hello.id
);
const parentAndChild = makeParentAndChildren(
  "max",
  "you can reply to stuff!",
  [makeMessage("max", "hello from below!", null, null)],
  null,
  chain[chain.length - 1].id
);

const adaReplies = makeChain(
  "ada",
  ["Woah!", "that's really cool!", "what else can it do?"],
  null,
  parentAndChild[0].id
);

const maxReplies = makeChain(
  "max",
  ["the", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"],
  adaReplies[1].id,
  null
);
const events = [
  veryFirst,
  hello,
  helloReaction,
  ...chain,
  ...parentAndChild,
  ...adaReplies,
  ...maxReplies,
];

const dummyRoom: Room = {
  creator: "max",
  created: Date.now(),
  id: uniqid(),
  members: ["max", "you", "ada"],
  name: "Telescope emoji",
  events,
  lastTyping: {},
};

export default dummyRoom;
