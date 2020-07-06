import styled from "styled-components";
import * as React from "react";
import {
  Embellishment,
  Message,
  SagaEvent,
  Clustered,
  TreeEvt,
} from "../../types/events";
import { idToEvent } from "../../types/utils/buildTree";
import BubbleAndControls from "./BubbleAndControls";
import { BubbleMode } from "./Bubble";
import { Id } from "../../types/entity";
import isSubstantiveMessage from "../../types/utils/isSubstantiveMessage";
import { DummyAppDataContext } from "../../types/dummy/dummyAppData";

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
  padding-left: 40px;
`;

const PROPIC_SIZE = "25px";

const Propic = styled.div<any>`
  display: inline-block;
  width: ${PROPIC_SIZE};
  height: ${PROPIC_SIZE};
  border-radius: 1000px;
  background: url(${({ uri }: any) => uri});
  background-size: cover;
  background-repeat: no-repeat;
`;

export const clusterSubstantives = (cluster: Clustered, tree: idToEvent) =>
  cluster.map((id: Id) => tree[id]).filter(isSubstantiveMessage) as TreeEvt[];

const Cluster: React.FC<{
  cluster: Clustered;
  tree: idToEvent;
  onPush(id: Id): void;
  depth: number;
}> = ({ cluster, tree, depth, onPush }) => {
  const { knownUsers } = React.useContext(DummyAppDataContext);
  const substantives = clusterSubstantives(cluster, tree);
  if (substantives.length === 0) {
    return null;
  }
  const buffer = <div style={{ width: PROPIC_SIZE }} />;
  return (
    <ClusterDiv>
      <CreatorDiv>
        {knownUsers[tree[cluster[0]].creator].display_name}
      </CreatorDiv>
      {substantives.map((evt: TreeEvt, j: number) => {
        const childEvents = evt.children || [];
        return (
          <div
            key={j}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              marginTop: "5px",
            }}
          >
            {j === 0 ? <Propic uri={knownUsers[evt.creator].avatar} /> : buffer}
            <BubbleAndControls
              message={evt as any}
              childEvents={childEvents}
              depth={depth}
              tree={tree}
              onPush={onPush}
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
          </div>
        );
      })}
    </ClusterDiv>
  );
};

export default Cluster;
