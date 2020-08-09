import styled from "styled-components";
import * as React from "react";
import {
  Message,
  Embellishment,
  SagaEvent,
  Clusters,
} from "../../data/types/events";
import Content from "./Content";
import { purple_primary } from "../../colors";
import { Id } from "../../data/types/entity";

export enum BubbleMode {
  top,
  middle,
  bottom,
  singleton,
}

const BubbleDiv = styled.div<any>`
  max-width: 300px;
  display: inline-block;
  background-color: ${purple_primary};
  color: #ffffff;
  border-radius: ${({ mode }: any) =>
    (mode === BubbleMode.bottom || mode === BubbleMode.middle
      ? "5px"
      : "15px") +
    " 15px " +
    " 15px " +
    (mode === BubbleMode.top || mode === BubbleMode.middle ? "5px" : "15px")};
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
  padding: 0;
  opacity: ${({ depth }: any) => 100 - 20 * depth}%;
`;

const filterEmbellishmentsByContentIdx = (
  embellishments: Embellishment[],
  index: number
) => embellishments.filter(({ contentIndex }) => contentIndex === index);

export interface BubbleProps {
  message: Message;
  mode: BubbleMode;
  childEvents: Id[];
  depth: number;
}

// TODO: hover to show precise time?
// TODO: make images borderless (conditional padding)
const Bubble: React.FC<BubbleProps> = ({
  message,
  mode,
  childEvents,
  depth,
}) => {
  const { contents } = message;
  const renderedContent = contents.map((content, index) => (
    <Content key={index} content={content} childContent={[]} />
  ));
  return (
    <BubbleDiv mode={mode} depth={depth}>
      {renderedContent}
    </BubbleDiv>
  );
};

export default Bubble;
