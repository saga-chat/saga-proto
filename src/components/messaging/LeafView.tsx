import styled from "styled-components";
import * as React from "react";
import { Clustered, Clusters, ChildMap, SagaEvent } from "../../types/events";
import { Room } from "../../types/room";
import buildTree, { idToEvent } from "../../types/utils/buildTree";
import Cluster from "./Cluster";
import { Id } from "../../types/entity";
import clusterIDs from "../../types/utils/clusterIDs";

const LeafView: React.FC<{
  room: Room;
  tree: idToEvent;
  ids: Id[];
  onPush(id: Id): void;
  childMap: ChildMap;
  contentType: "SUBSTANTIVES" | "REACTIONS";
}> = ({ room, tree, ids, onPush, childMap, contentType }) => {
  // TODO: cluster does not support non messages!
  const clusters = clusterIDs(tree, ids[ids.length - 1]);
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
          />
        ) : null
      )}
    </div>
  );
};

export default LeafView;
