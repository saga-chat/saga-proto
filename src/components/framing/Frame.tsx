import styled from "styled-components";
import * as React from "react";
import { Room } from "../../data/types/room";
import buildTree, { IdToEvent } from "../../data/utils/buildTree";
import TreeView, { clusterSubstantives } from "../messaging/TreeView";
import { Id } from "../../data/types/entity";
import { AppData } from "../../data/types/appdata";
import { DummyAppDataContext } from "../../data/dummy/dummyAppData";
import Bubble, { BubbleMode } from "../messaging/Bubble";
import { Message } from "../../data/types/events";
import { Propic, CreatorDiv } from "../messaging/Cluster";
import { purple_primary } from "../../colors";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ChatBubble from "@material-ui/icons/ChatBubble";
import EmojiEmoticons from "@material-ui/icons/EmojiEmotions";
import InboxIcon from "@material-ui/icons/Inbox";
import AccountTree from "@material-ui/icons/AccountTree";
import Badge from "@material-ui/core/Badge";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import isTerminalReaction from "../../data/utils/isTerminalReaction";
import LeafView from "../messaging/LeafView";
import Composer from "../messaging/Composer";
import { useCallback } from "react";
import isSubstantiveMessage from "../../data/utils/isSubstantiveMessage";
import {
  appStateReducer,
  initAppState,
  View,
  ContentTab,
  pushParent,
} from "../../data/reducers/appState";

const getCurrentDepth = (id: Id | null, tree: IdToEvent): number =>
  id !== null && tree[id].parent !== null
    ? getCurrentDepth(tree[id].parent as any, tree) + 1
    : 0;

const Breadcrumb = styled.div`
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  padding: 1em;
  margin-bottom: 1em;
`;

const BackButton = styled.button`
  outline: none;
  color: ${purple_primary};
  background: none;
  border: none;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 1em;
  cursor: pointer;
  transition: 0.2s;
  opacity: 1;
  :hover {
    opacity: 0.8;
    transition: 0.2s;
  }
`;

export type ReplyingMode = {
  replyingTo: Id | null;
};

const Frame: React.FC = () => {
  const appData = React.useContext(DummyAppDataContext);
  const room = appData.knownRooms[appData.myRooms[0]];
  const { events } = room;

  const [appState, dispatch] = React.useReducer(
    appStateReducer,
    { events },
    initAppState
  );

  const currentDepth = getCurrentDepth(
    appState.currentParent,
    appState.idToEvent
  );
  const currentIds =
    appState.currentParent !== null
      ? appState.childMap[appState.currentParent]
      : appState.treeTop;
  const parentUser =
    appState.currentParent !== null
      ? appData.knownUsers[appState.idToEvent[appState.currentParent].creator]
      : null;

  const substantives =
    appState.currentParent !== null
      ? clusterSubstantives(currentIds, appState.idToEvent, appState.childMap)
      : [];

  const terminalReactions =
    appState.currentParent !== null
      ? currentIds.filter((id: Id) =>
          isTerminalReaction(id, appState.idToEvent, appState.childMap)
        )
      : [];

  const shouldReply =
    appState.replyingTo ||
    (appState.currentView === View.TREE &&
      appState.currentContentTab === ContentTab.SUBSTANTIVES);

  return (
    <div style={{ display: "flex", flexFlow: "column", height: "100vh" }}>
      <Breadcrumb>
        {appState.currentParent !== null ? (
          <>
            <BackButton
              onClick={() =>
                dispatch(
                  pushParent(
                    appState.idToEvent[appState.currentParent || ""].parent
                  )
                )
              }
            >
              {"< back"}
            </BackButton>
            <CreatorDiv>{parentUser?.display_name}</CreatorDiv>
            <Propic uri={parentUser?.avatar} />
            <Bubble
              mode={BubbleMode.singleton}
              depth={0}
              childEvents={[]}
              message={appState.idToEvent[appState.currentParent] as Message}
            />
          </>
        ) : (
          <>
            <BackButton>{room.name}</BackButton>
            <Tabs
              value={appState.currentView}
              onChange={(e: any, value: number) =>
                dispatch({ type: "CHANGE_VIEW", view: value })
              }
              style={{ display: "inline-block" }}
            >
              <Tab icon={<AccountTree fontSize="small" />} />
              <Tab icon={<InboxIcon fontSize="small" />} />
            </Tabs>
          </>
        )}
      </Breadcrumb>
      {appState.currentParent !== null && (
        <Tabs
          value={appState.currentContentTab}
          onChange={(e: any, value: any) =>
            dispatch({ type: "CHANGE_CONTENT_TAB", contentTab: value })
          }
        >
          <Tab
            label={
              <Badge badgeContent={substantives.length} color="primary">
                <ChatBubble />
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={terminalReactions.length} color="primary">
                <EmojiEmoticons />
              </Badge>
            }
          />
        </Tabs>
      )}
      <div style={{ overflow: "auto", flex: 1 }}>
        {appState.currentView === View.TREE ? (
          <TreeView
            room={room}
            ids={currentIds}
            appState={appState}
            dispatch={dispatch}
            contentType={
              appState.currentContentTab === ContentTab.SUBSTANTIVES ||
              appState.currentParent === null
                ? ContentTab.SUBSTANTIVES
                : ContentTab.REACTIONS
            }
          />
        ) : (
          <LeafView room={room} appState={appState} dispatch={dispatch} />
        )}
      </div>
      {shouldReply && <Composer appState={appState} dispatch={dispatch} />}
    </div>
  );
};

export default Frame;
