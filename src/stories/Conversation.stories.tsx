import Bubble, { BubbleMode } from "../components/messaging/Bubble";
import * as React from "react";
import messageDummy from "../data/dummy/dummyMessage";
import { action } from "@storybook/addon-actions";
import Conversation from "../components/messaging/TreeView";
import dummyRoom from "../data/dummy/dummyRoom";
import buildTree from "../data/utils/buildTree";
// const { events } = dummyRoom;
// const {tree, clusters} = buildTree(events);
// export const ConvoComplete = () => (
//   <Conversation room={dummyRoom} tree={tree} onPush={action("push")} />
// );

export default {
  title: "Conversation",
  component: Conversation,
};
