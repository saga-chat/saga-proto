import styled from "styled-components";
import * as React from "react";
import { Message, Embellishment } from "../../types/events";
import Content from "./Content";
import { purple_primary } from "../../colors";

const BubbleDiv = styled.div<any>`
  max-width: 300px;
  display: inline-block;
  background-color: ${purple_primary};
  color: #ffffff;
  padding: 6px 12px;
  border-radius: ${({ mode }: any) =>
    (mode === BubbleMode.bottom || mode === BubbleMode.middle
      ? "5px"
      : "15px") +
    " 15px " +
    " 15px " +
    (mode === BubbleMode.top || mode === BubbleMode.middle ? "5px" : "15px")};
`;

export enum BubbleMode {
  top,
  middle,
  bottom,
  singleton,
}

const filterEmbellishmentsByContentIdx = (
  embellishments: Embellishment[],
  index: number
) => embellishments.filter(({ contentIndex }) => contentIndex === index);

// TODO: hover to show precise time?
// TODO: make images borderless (conditional padding)
const Bubble: React.FC<{
  message: Message;
  mode: BubbleMode;
  embellishments: Embellishment[];
}> = ({ message, mode, embellishments }) => {
  const { contents } = message;
  const renderedContent = contents.map((content, index) => (
    <Content
      content={content}
      embellishments={filterEmbellishmentsByContentIdx(embellishments, index)}
    />
  ));
  return <BubbleDiv mode={mode}>{renderedContent}</BubbleDiv>;
};

export default Bubble;
