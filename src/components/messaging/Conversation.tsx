import styled from "styled-components";
import * as React from "react";
import { Clustered, Clusters, ChildMap, SagaEvent } from "../../types/events";
import { Room } from "../../types/room";
import buildTree, { idToEvent } from "../../types/utils/buildTree";
import Cluster from "./Cluster";
import { Id } from "../../types/entity";
import clusterIDs from "../../types/utils/clusterIDs";
import isSubstantiveMessage from "../../types/utils/isSubstantiveMessage";
import isTerminalReaction from "../../types/utils/isTerminalReaction";

export const clusterSubstantives = (
  cluster: Id[],
  tree: idToEvent,
  childMap: ChildMap
) => cluster.filter((id: Id) => isSubstantiveMessage(id, tree, childMap));

const Conversation: React.FC<{
  room: Room;
  tree: idToEvent;
  ids: Id[];
  onPush(id: Id): void;
  childMap: ChildMap;
  contentType: "SUBSTANTIVES" | "REACTIONS";
}> = ({ room, tree, ids, onPush, childMap, contentType }) => {
  // TODO: cluster does not support non messages!
  const clusters = clusterIDs(tree, ids[ids.length - 1]).map((cluster) =>
    contentType === "SUBSTANTIVES"
      ? clusterSubstantives(cluster, tree, childMap)
      : cluster.filter((id) => isTerminalReaction(id, tree, childMap))
  );
  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      {clusters.map((cluster: Clustered, i: number) =>
        cluster.length > 0 ? (
          <Cluster
            childMap={childMap}
            key={i}
            ids={cluster}
            tree={tree}
            depth={0}
            onPush={onPush}
          />
        ) : null
      )}
    </div>
  );
};

export default Conversation;
