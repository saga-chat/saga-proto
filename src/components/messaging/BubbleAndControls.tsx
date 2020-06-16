import styled from "styled-components";
import * as React from "react";
import { Message, Embellishment } from "../../types/events";
import { BubbleProps } from "./Bubble";
import Content from "./Content";
import { purple_primary } from "../../colors";
import Bubble from "./Bubble";
import SideButtons from "./SideButtons";

const BubbleControlsDiv = styled.div<any>`
  display: flex;
  align-items: center;
`;
const BubbleControls = styled.div`
  display: flex;
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

type BubbleAndControlsProps = BubbleProps & SideButtonsData;
const BubbleAndControls: React.FC<BubbleAndControlsProps> = ({
  message,
  mode,
  embellishments,
  currentHighlight,
  onReplyClick,
}) => {
  const [showControls, setShowControls] = React.useState(false);
  return (
    <BubbleControlsDiv
      onMouseOver={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Bubble message={message} mode={mode} embellishments={embellishments} />
      <SideButtons
        show={showControls}
        selected={currentHighlight}
        onReplyClick={onReplyClick}
      />
    </BubbleControlsDiv>
  );
};

export default BubbleAndControls;
