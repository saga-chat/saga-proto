import styled from "styled-components";
import * as React from "react";
import { Embellishment, Message, SagaEvent, IdArr } from "../../types/events";
import { idToEvent } from "../../types/utils/buildTree";
import BubbleAndControls from "./BubbleAndControls";
import { BubbleMode } from "./Bubble";
import { Id } from "../../types/entity";

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

const Cluster: React.FC<{ cluster: IdArr; tree: idToEvent }> = ({
  cluster,
  tree,
}) => {
  return (
    <ClusterDiv>
      <CreatorDiv>{tree[cluster[0]].creator}</CreatorDiv>
      {cluster.map((id: Id, j: number) => {
        if (tree[id].kind === "message") {
          // to get embellishments, filter children
          const childEvents =
            tree[id].children !== undefined
              ? tree[id].children?.flat().map((ch: any) => tree[ch])!
              : [];
          return (
            <BubbleAndControls
              key={j}
              message={tree[id] as any}
              childEvents={childEvents}
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
        }
      })}
    </ClusterDiv>
  );
};

export default Cluster;
