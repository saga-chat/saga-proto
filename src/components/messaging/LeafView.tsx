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
import getParentsWithNewChildren from "../../data/utils/getParentsWithNewChildren";
import { DummyAppDataContext } from "../../data/dummy/dummyAppData";

const LeafView: React.FC<{
  room: Room;
  tree: idToEvent;
  onPush(id: Id): void;
  childMap: ChildMap;
  onReplyClick(id: Id): void;
}> = ({ room, tree, onPush, childMap, onReplyClick }) => {
  const appData = React.useContext(DummyAppDataContext);
  const ids = getParentsWithNewChildren(tree, appData.me);
  const clusters = clusterIDs(tree, ids[ids.length - 1], ids);
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

export default LeafView;
