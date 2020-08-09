import { Room } from "../types/room";
import uniqid from "uniqid";
import makeChain from "./makeChain";
import makeMessage from "./makeMessage";
import makeParentAndChildren from "./makeParentAndChildren";
import reactToMessage from "./reactToMessage";
import dummyMeId from "./dummyMe";
import dummyUsers from "./dummyUsers";
import makeImage from "./makeImage";

const dummyUserIDs = Object.keys(dummyUsers);

const veryFirst = makeMessage(dummyMeId, "**Intro to Saga**", null, null);
const hello = makeMessage(dummyMeId, "Hello!", null, veryFirst.id);
const helloReaction = reactToMessage(dummyMeId, hello, null, "😋", null);
const chain = makeChain(
  dummyMeId,
  [
    "Welcome to `saga`!",
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

const adaReplyReaction = reactToMessage(
  dummyUserIDs[3],
  adaReplies[1] as any,
  null,
  "👍",
  null
);

const maxReplies = makeChain(
  dummyMeId,
  ["# the", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"],
  adaReplies[1].id,
  adaReplyReaction.id
);

const maxReplyReaction = reactToMessage(
  dummyUserIDs[2],
  maxReplies[5] as any,
  null,
  "❤️",
  null
);

const imgFirst = makeImage(
  dummyUserIDs[1],
  "https://d2w9rnfcy7mm78.cloudfront.net/6647576/original_68db1c6470569c7d3f47de34dc7ddf81.jpg?1585586959?bc=0",
  null,
  adaReplies[adaReplies.length - 1].id
);

const imgSnd = makeImage(
  dummyUserIDs[2],
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_New_Mexico.svg/320px-Flag_of_New_Mexico.svg.png",
  imgFirst.id,
  null,
  "look at mee im the state of new mexico hehehe"
);

const events = [
  veryFirst,
  hello,
  helloReaction,
  ...chain,
  ...parentAndChild,
  ...adaReplies,
  adaReplyReaction,
  ...maxReplies,
  maxReplyReaction,
  imgFirst,
  imgSnd,
];

const dummyRoom: Room = {
  creator: dummyMeId,
  created: Date.now(),
  id: uniqid(),
  members: { [dummyMeId]: { id: dummyMeId, online: true, lastTyping: null } },
  name: "Brady Bunch Room",
  events,
};

export default dummyRoom;
