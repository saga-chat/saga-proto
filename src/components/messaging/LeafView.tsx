import styled from "styled-components";
import * as React from "react";
import {
  Clustered,
  Clusters,
  ChildMap,
  SagaEvent,
} from "../../data/types/events";
import { Room } from "../../data/types/room";
import buildTree, { IdToEvent } from "../../data/utils/buildTree";
import Cluster from "./Cluster";
import { Id } from "../../data/types/entity";
import clusterIDs from "../../data/utils/clusterIDs";
import getParentsWithNewChildren from "../../data/utils/getParentsWithNewChildren";
import { DummyAppDataContext } from "../../data/dummy/dummyAppData";
import { AppStateDispatcher, AppState } from "../../data/reducers/appState";

const LeafView: React.FC<{
  room: Room;
  appState: AppState;
  dispatch: AppStateDispatcher;
}> = ({ room, appState, dispatch }) => {
  const appData = React.useContext(DummyAppDataContext);
  const ids = getParentsWithNewChildren(appState.idToEvent, appData.me);
  const clusters = clusterIDs(appState.idToEvent, ids[ids.length - 1], ids);
  return (
    <div>
      {clusters.map((cluster: Clustered, i: number) =>
        cluster.length > 0 ? (
          <Cluster
            childMap={appState.childMap}
            key={i}
            ids={cluster}
            tree={appState.idToEvent}
            depth={0}
            onPush={(id: any) => dispatch({ type: "PUSH_PARENT", parent: id })}
            onReplyClick={(id: any) =>
              dispatch({ type: "SET_REPLYING_TO", replyingTo: id })
            }
          />
        ) : null
      )}
    </div>
  );
};

export default LeafView;
