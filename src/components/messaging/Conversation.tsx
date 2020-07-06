import styled from "styled-components";
import * as React from "react";
import { Clustered, Clusters } from "../../types/events";
import { Room } from "../../types/room";
import buildTree, { idToEvent } from "../../types/utils/buildTree";
import Cluster from "./Cluster";
import { Id } from "../../types/entity";

const Conversation: React.FC<{
  room: Room;
  tree: idToEvent;
  clusters: Clusters;
  onPush(id: Id): void;
}> = ({ room, tree, clusters, onPush }) => {
  // TODO: cluster does not support non messages!
  return (
    <div>
      {clusters.map((cluster: Clustered, i: number) => (
        <Cluster
          key={i}
          cluster={cluster}
          tree={tree}
          depth={0}
          onPush={onPush}
        />
      ))}
    </div>
  );
};

export default Conversation;
