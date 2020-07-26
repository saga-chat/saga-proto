import styled from "styled-components";
import * as React from "react";
import {
  Embellishment,
  Clustered,
  Message,
  Clusters,
  ChildMap,
  SagaEvent,
} from "../../types/events";
import { BubbleProps } from "./Bubble";
import Bubble from "./Bubble";
import SideButtons, { SideButtonsData } from "./SideButtons";
import MoreReplies from "./MoreReplies";
import Cluster from "./Cluster";
import { idToEvent } from "../../types/utils/buildTree";
import isSubstantiveMessage from "../../types/utils/isSubstantiveMessage";
import { reduceRight, takeRight, difference } from "lodash";
import { Id } from "../../types/entity";
import clusterIDs from "../../types/utils/clusterIDs";
import { clusterSubstantives } from "./Conversation";

export const MAX_PREVIEW_ELEMS = 5;
export const MAX_DEPTH = 3;

const BubbleControlsDiv = styled.div<any>`
  margin-left: 5px;
  position: relative;
  width: 100%;
  border-radius: 5px;
  :hover {
    /* background-color: rgba(0, 0, 200, 0.05); */
  }
`;

const filterEmbellishmentsByContentIdx = (
  embellishments: Embellishment[],
  index: number
) => embellishments.filter(({ contentIndex }) => contentIndex === index);

type BubbleAndControlsProps = BubbleProps & {
  tree: idToEvent;
  childMap: ChildMap;
  onPush(id: Id): void;
};
const BubbleAndControls: React.FC<BubbleAndControlsProps> = ({
  message,
  mode,
  childEvents,
  depth,
  tree,
  onPush,
  childMap,
}) => {
  const [showControls, setShowControls] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const substantiveChildren = clusterSubstantives(childEvents, tree, childMap);
  const lastNSubstantives =
    depth > MAX_DEPTH ? [] : takeRight(substantiveChildren, MAX_PREVIEW_ELEMS);
  const truncated = difference(childEvents, lastNSubstantives);
  const clustering =
    lastNSubstantives.length > 0
      ? clusterIDs(
          tree,
          lastNSubstantives[lastNSubstantives.length - 1],
          lastNSubstantives
        )
      : [];
  return (
    <div style={{ display: "inline-block", flexGrow: 1 }}>
      <BubbleControlsDiv
        onMouseOver={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        // onMouseDown={() => setSelected(1)}
        // onMouseUp={() => setSelected(null)}
      >
        <Bubble
          message={message}
          mode={mode}
          childEvents={childEvents}
          depth={depth}
        />
        <SideButtons
          show={showControls}
          selected={selected}
          onReplyClick={console.log}
        />
      </BubbleControlsDiv>
      {truncated.length > 0 && (
        <MoreReplies
          tree={tree}
          childEvents={truncated}
          onClick={() => onPush(message.id)}
        />
      )}
      <div style={{ paddingLeft: "1em" }}>
        {clustering.map((cluster: Clustered, i: number) => (
          <Cluster
            key={i}
            ids={cluster}
            tree={tree}
            depth={depth + 1}
            onPush={onPush}
            childMap={childMap}
          />
        ))}
      </div>
    </div>
  );
};

export default BubbleAndControls;
