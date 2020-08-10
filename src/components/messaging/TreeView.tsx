import styled from "styled-components";
import * as React from "react";
import {
  Clustered,
  Clusters,
  ChildMap,
  SagaEvent,
} from "../../data/types/events";
import { Room } from "../../data/types/room";
import { IdToEvent } from "../../data/utils/buildTree";
import Cluster from "./Cluster";
import { Id } from "../../data/types/entity";
import clusterIDs from "../../data/utils/clusterIDs";
import isSubstantiveMessage from "../../data/utils/isSubstantiveMessage";
import isReaction from "../../data/utils/isReaction";
import {
  AppState,
  AppStateDispatcher,
  ContentTab,
  pushParent,
} from "../../data/reducers/appState";

export const clusterSubstantives = (
  cluster: Id[],
  idToEvent: IdToEvent,
  childMap: ChildMap
) => cluster.filter((id: Id) => isSubstantiveMessage(id, idToEvent, childMap));

const TreeView: React.FC<{
  room: Room;
  ids: Id[];
  appState: AppState;
  dispatch: AppStateDispatcher;
  contentType: ContentTab;
}> = ({ room, ids, contentType, appState, dispatch }) => {
  // TODO: cluster does not support non messages!
  const clusters = clusterIDs(
    appState.idToEvent,
    ids[ids.length - 1]
  ).map((cluster: Id[]) =>
    contentType === ContentTab.SUBSTANTIVES
      ? clusterSubstantives(cluster, appState.idToEvent, appState.childMap)
      : cluster.filter((id) =>
          isReaction(id, appState.idToEvent, appState.childMap)
        )
  );
  return (
    <div>
      {clusters.map((cluster: Clustered, i: number) =>
        cluster.length > 0 ? (
          <Cluster
            key={i}
            ids={cluster}
            appState={appState}
            dispatch={dispatch}
            depth={0}
          />
        ) : null
      )}
    </div>
  );
};

export default TreeView;
