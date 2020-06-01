import Bubble, { BubbleMode } from "../components/messaging/Bubble";
import * as React from "react";
import messageDummy from "../types/dummy/dummyMessage";

export const Top = () => (
  <Bubble message={messageDummy} mode={BubbleMode.top} embellishments={[]} />
);
export const Middle = () => (
  <Bubble message={messageDummy} mode={BubbleMode.middle} embellishments={[]} />
);
export const Bottom = () => (
  <Bubble message={messageDummy} mode={BubbleMode.bottom} embellishments={[]} />
);
export const Singleton = () => (
  <Bubble
    message={messageDummy}
    mode={BubbleMode.singleton}
    embellishments={[]}
  />
);
export default {
  title: "Bubble",
  component: Bubble,
};
