import Bubble, { BubbleMode } from "../components/messaging/Bubble";
import * as React from "react";
import messageDummy from "../types/dummy/dummyMessage";
import BubbleAndControls from "../components/messaging/BubbleAndControls";
import { action } from "@storybook/addon-actions";

// export const Singleton = () => (
//   <BubbleAndControls
//     message={messageDummy}
//     mode={BubbleMode.singleton}
//     childEvents={[]}
//     depth={0}
//     childMap={{}}
//   />
// );

export default {
  title: "Controls-Bubble",
  component: BubbleAndControls,
};
