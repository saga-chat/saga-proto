import { Room } from "../room";
import uniqid from "uniqid";
import makeChain from "./makeChain";
import makeMessage from "./makeMessage";
import makeParentAndChildren from "./makeParentAndChildren";
import reactToMessage from "./reactToMessage";
import dummyMeId from "./dummyMe";
import dummyUsers from "./dummyUsers";

const dummyUserIDs = Object.keys(dummyUsers);

const veryFirst = makeMessage(dummyMeId, "**Intro to Saga**", null, null);
const hello = makeMessage(dummyMeId, "Hello!", null, veryFirst.id);
const helloReaction = reactToMessage(dummyMeId, hello, null, "😋", null);
const chain = makeChain(
  dummyMeId,
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
  dummyMeId,
  "you can reply to stuff!",
  [makeMessage(dummyMeId, "hello from below!", null, null)],
  null,
  chain[chain.length - 1].id
);

const adaReplies = makeChain(
  dummyUserIDs[0],
  ["Woah!", "that's really cool!", "what else can it do?"],
  null,
  parentAndChild[0].id
);

const maxReplies = makeChain(
  dummyMeId,
  ["the", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"],
  adaReplies[1].id,
  null
);

const maxReplyReaction = reactToMessage(
  dummyUserIDs[2],
  maxReplies[5] as any,
  null,
  "❤️",
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
  maxReplyReaction,
];

const dummyRoom: Room = {
  creator: dummyMeId,
  created: Date.now(),
  id: uniqid(),
  members: { [dummyMeId]: { id: dummyMeId, online: true, lastTyping: null } },
  name: "Telescope emoji",
  events,
};

export default dummyRoom;
