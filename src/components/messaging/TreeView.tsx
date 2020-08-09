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
import isTerminalReaction from "../../data/utils/isTerminalReaction";
import {
  AppState,
  AppStateDispatcher,
  ContentTab,
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
          isTerminalReaction(id, appState.idToEvent, appState.childMap)
        )
  );
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

export default TreeView;
