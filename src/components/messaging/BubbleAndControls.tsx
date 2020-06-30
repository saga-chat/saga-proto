import styled from "styled-components";
import * as React from "react";
import { Message, Embellishment } from "../../types/events";
import { BubbleProps } from "./Bubble";
import Content from "./Content";
import { purple_primary } from "../../colors";
import Bubble from "./Bubble";
import SideButtons, { SideButtonsData } from "./SideButtons";

const BubbleControlsDiv = styled.div<any>`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const filterEmbellishmentsByContentIdx = (
  embellishments: Embellishment[],
  index: number
) => embellishments.filter(({ contentIndex }) => contentIndex === index);

type BubbleAndControlsProps = BubbleProps & SideButtonsData;
const BubbleAndControls: React.FC<BubbleAndControlsProps> = ({
  message,
  mode,
  embellishments,
  selected,
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
        selected={selected}
        onReplyClick={onReplyClick}
      />
      {embellishments.map((e: Embellishment) => e.id)}
    </BubbleControlsDiv>
  );
};

export default BubbleAndControls;
