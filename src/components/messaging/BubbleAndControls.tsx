import styled from "styled-components";
import * as React from "react";
import { Message, Embellishment } from "../../types/events";
import { BubbleProps } from "./Bubble";
import Content from "./Content";
import { purple_primary } from "../../colors";
import Bubble from "./Bubble";
import SideButtons, { SideButtonsData } from "./SideButtons";
import MoreReplies from "./MoreReplies";

const BubbleControlsDiv = styled.div<any>`
  margin-top: 5px;
  position: relative;
  width: 100%;
`;

const filterEmbellishmentsByContentIdx = (
  embellishments: Embellishment[],
  index: number
) => embellishments.filter(({ contentIndex }) => contentIndex === index);

type BubbleAndControlsProps = BubbleProps;
const BubbleAndControls: React.FC<BubbleAndControlsProps> = ({
  message,
  mode,
  childEvents,
}) => {
  const [showControls, setShowControls] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  return (
    <div>
      <BubbleControlsDiv
        onMouseOver={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onMouseDown={() => setSelected(1)}
        onMouseUp={() => setSelected(null)}
      >
        <Bubble message={message} mode={mode} childEvents={childEvents} />
        <SideButtons
          show={showControls}
          selected={selected}
          onReplyClick={console.log}
        />
      </BubbleControlsDiv>
      {childEvents.length > 0 && <MoreReplies childEvents={childEvents} />}
    </div>
  );
};

export default BubbleAndControls;
