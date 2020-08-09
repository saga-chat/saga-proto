import Bubble, { BubbleMode } from "../components/messaging/Bubble";
import * as React from "react";
import messageDummy from "../data/dummy/dummyMessage";

export const Top = () => (
  <Bubble
    message={messageDummy}
    mode={BubbleMode.top}
    childEvents={[]}
    depth={0}
  />
);
export const Middle = () => (
  <Bubble
    message={messageDummy}
    mode={BubbleMode.middle}
    childEvents={[]}
    depth={0}
  />
);
export const Bottom = () => (
  <Bubble
    message={messageDummy}
    mode={BubbleMode.bottom}
    childEvents={[]}
    depth={0}
  />
);
export const Singleton = () => (
  <Bubble
    message={messageDummy}
    mode={BubbleMode.singleton}
    childEvents={[]}
    depth={0}
  />
);

export default {
  title: "Bubble",
  component: Bubble,
};
