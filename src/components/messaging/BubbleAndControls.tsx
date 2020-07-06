import styled from "styled-components";
import * as React from "react";
import {
  Embellishment,
  Clustered,
  Message,
  Clusters,
  TreeEvt,
} from "../../types/events";
import { BubbleProps } from "./Bubble";
import Bubble from "./Bubble";
import SideButtons, { SideButtonsData } from "./SideButtons";
import MoreReplies from "./MoreReplies";
import Cluster, { clusterSubstantives } from "./Cluster";
import { idToEvent } from "../../types/utils/buildTree";
import isSubstantiveMessage from "../../types/utils/isSubstantiveMessage";
import { reduceRight, takeRight, difference } from "lodash";
import { Id } from "../../types/entity";

export const MAX_PREVIEW_ELEMS = 5;
export const MAX_DEPTH = 3;

const BubbleControlsDiv = styled.div<any>`
  margin-left: 5px;
  position: relative;
  width: 100%;
`;

const filterEmbellishmentsByContentIdx = (
  embellishments: Embellishment[],
  index: number
) => embellishments.filter(({ contentIndex }) => contentIndex === index);

type BubbleAndControlsProps = BubbleProps & {
  tree: idToEvent;
  onPush(id: Id): void;
};
const BubbleAndControls: React.FC<BubbleAndControlsProps> = ({
  message,
  mode,
  childEvents,
  depth,
  tree,
  onPush,
}) => {
  const [showControls, setShowControls] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  if (!isSubstantiveMessage(message as TreeEvt)) {
    return <pre>message has no substance!</pre>;
  }
  const substantiveChildren = childEvents.map((cluster: Clustered) =>
    clusterSubstantives(cluster, tree)
  );
  const lastNSubstantives =
    depth > MAX_DEPTH
      ? { clusters: substantiveChildren.map(() => []) as Clusters }
      : reduceRight(
          substantiveChildren,
          (cur: any, messages: Message[]) => {
            const taken = takeRight(messages, MAX_PREVIEW_ELEMS - cur.elems);
            return {
              elems: cur.elems + taken.length,
              clusters: [taken.map((t) => t.id), ...cur.clusters],
            };
          },
          { elems: 0, clusters: [] as Clusters }
        );
  const truncated = childEvents.map((cluster: Clustered, i: number) =>
    difference(cluster, lastNSubstantives.clusters[i])
  );
  return (
    <div style={{ display: "inline-block", flexGrow: 1 }}>
      <BubbleControlsDiv
        onMouseOver={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onMouseDown={() => setSelected(1)}
        onMouseUp={() => setSelected(null)}
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
      {truncated.flat().length > 0 && (
        <MoreReplies
          tree={tree}
          childEvents={truncated}
          onClick={() => onPush(message.id)}
        />
      )}
      <div style={{ paddingLeft: "1em" }}>
        {lastNSubstantives.clusters.map((cluster: Clustered, i: number) => (
          <Cluster
            key={i}
            cluster={cluster}
            tree={tree}
            depth={depth + 1}
            onPush={onPush}
          />
        ))}
      </div>
    </div>
  );
};

export default BubbleAndControls;
