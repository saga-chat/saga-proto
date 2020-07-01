import styled from "styled-components";
import * as React from "react";
import {
  Embellishment,
  Message,
  SagaEvent,
  Clustered,
} from "../../types/events";
import { idToEvent } from "../../types/utils/buildTree";
import BubbleAndControls from "./BubbleAndControls";
import { BubbleMode } from "./Bubble";
import { Id } from "../../types/entity";
import isSubstantiveMessage from "../../types/utils/isSubstantiveMessage";

const ClusterDiv = styled.div`
  display: inline-block;
  padding: 0;
  margin: 5px;
  width: 100%;
  max-width: 700px;
`;

const CreatorDiv = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.75);
  font-size: 12px;
  padding-left: 10px;
`;

export const clusterSubstantives = (cluster: Clustered, tree: idToEvent) =>
  cluster.map((id: Id) => tree[id]).filter(isSubstantiveMessage) as Message[];

const Cluster: React.FC<{
  cluster: Clustered;
  tree: idToEvent;
  depth: number;
}> = ({ cluster, tree, depth }) => {
  const substantives = clusterSubstantives(cluster, tree);
  return (
    <ClusterDiv>
      <CreatorDiv>{tree[cluster[0]].creator}</CreatorDiv>
      {substantives.map((evt: Message, j: number) => {
        // to get embellishments, filter children
        const childEvents = evt.children || [];
        return (
          <BubbleAndControls
            key={j}
            message={evt as any}
            childEvents={childEvents}
            depth={depth}
            tree={tree}
            mode={
              cluster.length === 1
                ? BubbleMode.singleton
                : j === 0
                ? BubbleMode.top
                : j === cluster.length - 1
                ? BubbleMode.bottom
                : BubbleMode.middle
            }
          />
        );
      })}
    </ClusterDiv>
  );
};

export default Cluster;
