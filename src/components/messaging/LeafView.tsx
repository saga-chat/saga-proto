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
import {
  AppStateDispatcher,
  AppState,
  pushParent,
} from "../../data/reducers/appState";

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
            key={i}
            ids={cluster}
            depth={0}
            dispatch={dispatch}
            appState={appState}
          />
        ) : null
      )}
    </div>
  );
};

export default LeafView;
