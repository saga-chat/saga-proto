import Bubble, { BubbleMode } from "../components/messaging/Bubble";
import * as React from "react";
import messageDummy from "../types/dummy/dummyMessage";
import { action } from "@storybook/addon-actions";
import Conversation from "../components/messaging/Conversation";
import dummyRoom from "../types/dummy/dummyRoom";

export const ConvoComplete = () => <Conversation room={dummyRoom} />;

export default {
  title: "Conversation",
  component: Conversation,
};
