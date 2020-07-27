import styled from "styled-components";
import * as React from "react";
import { Clustered, Clusters, ChildMap, SagaEvent } from "../../types/events";
import { Room } from "../../types/room";
import buildTree, { idToEvent } from "../../types/utils/buildTree";
import Cluster from "./Cluster";
import { Id } from "../../types/entity";
import clusterIDs from "../../types/utils/clusterIDs";
import getParentsWithNewChildren from "../../types/utils/getParentsWithNewChildren";
import { DummyAppDataContext } from "../../types/dummy/dummyAppData";

const LeafView: React.FC<{
  room: Room;
  tree: idToEvent;
  onPush(id: Id): void;
  childMap: ChildMap;
}> = ({ room, tree, onPush, childMap }) => {
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
          />
        ) : null
      )}
    </div>
  );
};

export default LeafView;
