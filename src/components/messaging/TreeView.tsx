import styled from "styled-components";
import * as React from "react";
import {
  Clustered,
  Clusters,
  ChildMap,
  SagaEvent,
} from "../../data/types/events";
import { Room } from "../../data/types/room";
import buildTree, { idToEvent } from "../../data/utils/buildTree";
import Cluster from "./Cluster";
import { Id } from "../../data/types/entity";
import clusterIDs from "../../data/utils/clusterIDs";
import isSubstantiveMessage from "../../data/utils/isSubstantiveMessage";
import isTerminalReaction from "../../data/utils/isTerminalReaction";

export const clusterSubstantives = (
  cluster: Id[],
  tree: idToEvent,
  childMap: ChildMap
) => cluster.filter((id: Id) => isSubstantiveMessage(id, tree, childMap));

const TreeView: React.FC<{
  room: Room;
  tree: idToEvent;
  ids: Id[];
  onPush(id: Id): void;
  childMap: ChildMap;
  contentType: "SUBSTANTIVES" | "REACTIONS";
  onReplyClick(id: Id): void;
}> = ({ room, tree, ids, onPush, childMap, contentType, onReplyClick }) => {
  // TODO: cluster does not support non messages!
  const clusters = clusterIDs(tree, ids[ids.length - 1]).map((cluster: Id[]) =>
    contentType === "SUBSTANTIVES"
      ? clusterSubstantives(cluster, tree, childMap)
      : cluster.filter((id) => isTerminalReaction(id, tree, childMap))
  );
  return (
    <div>
      {clusters.map((cluster: Clustered, i: number) =>
        cluster.length > 0 ? (
          <Cluster
            childMap={childMap}
            key={i}
            ids={cluster}
            tree={tree}
            depth={0}
            onPush={onPush}
            onReplyClick={onReplyClick}
          />
        ) : null
      )}
    </div>
  );
};

export default TreeView;
