import styled from "styled-components";
import * as React from "react";
import { Room } from "../../data/types/room";
import buildTree, { idToEvent } from "../../data/utils/buildTree";
import TreeView, { clusterSubstantives } from "../messaging/TreeView";
import { Id } from "../../data/types/entity";
import BigChip from "./BigChip";
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

const getCurrentDepth = (id: Id | null, tree: idToEvent): number =>
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
  const [tree, treeTop, childMap] = buildTree(events);
  const [currentParent, setCurrentParent] = React.useState<string | null>(null);
  const currentDepth = getCurrentDepth(currentParent, tree);
  const currentIds = currentParent !== null ? childMap[currentParent] : treeTop;
  const parentUser =
    currentParent !== null
      ? appData.knownUsers[tree[currentParent].creator]
      : null;

  const [currentTab, setCurrentTab] = React.useState(0);
  const [currentView, setCurrentView] = React.useState(0);

  const substantives =
    currentParent !== null
      ? clusterSubstantives(currentIds, tree, childMap)
      : [];

  const terminalReactions =
    currentParent !== null
      ? currentIds.filter((id: Id) => isTerminalReaction(id, tree, childMap))
      : [];

  const [replyingMode, setReplyingMode] = React.useState<ReplyingMode>({
    replyingTo: null,
  });

  const shouldReply =
    replyingMode.replyingTo || (currentView === 0 && currentTab === 0);

  const setReplyingTo = useCallback(
    (id: Id | null) => {
      setReplyingMode({ ...replyingMode, replyingTo: id });
    },
    [replyingMode]
  );

  //  USE DISPATCHER FOR EVERYTHING

  const onPush = useCallback(
    (id: Id | null) => {
      if (
        id !== null &&
        childMap[id].filter((child: Id) =>
          isSubstantiveMessage(child, tree, childMap)
        ).length === 0
      ) {
        setCurrentTab(1);
      } else {
        setCurrentTab(0);
      }
      setCurrentView(0);
      setCurrentParent(id);
      setReplyingTo(null);
    },
    [childMap, tree]
  );

  return (
    <div style={{ display: "flex", flexFlow: "column", height: "100vh" }}>
      <Breadcrumb>
        {currentParent !== null ? (
          <>
            <BackButton onClick={() => onPush(tree[currentParent].parent)}>
              {"< back"}
            </BackButton>
            <CreatorDiv>{parentUser?.display_name}</CreatorDiv>
            <Propic uri={parentUser?.avatar} />
            <Bubble
              mode={BubbleMode.singleton}
              depth={0}
              childEvents={[]}
              message={tree[currentParent] as Message}
            />
          </>
        ) : (
          <>
            <BackButton>{room.name}</BackButton>
            <Tabs
              value={currentView}
              onChange={(e: any, value: any) => setCurrentView(value)}
              style={{ display: "inline-block" }}
            >
              <Tab icon={<AccountTree fontSize="small" />} />
              <Tab icon={<InboxIcon fontSize="small" />} />
            </Tabs>
          </>
        )}
      </Breadcrumb>
      {currentParent !== null && (
        <Tabs
          value={currentTab}
          onChange={(e: any, value: any) => setCurrentTab(value)}
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
        {currentView === 0 ? (
          currentTab === 0 || currentParent === null ? (
            <TreeView
              room={room}
              tree={tree}
              ids={currentIds}
              onPush={onPush}
              childMap={childMap}
              contentType={"SUBSTANTIVES"}
              onReplyClick={setReplyingTo}
            />
          ) : currentTab === 1 ? (
            <TreeView
              room={room}
              tree={tree}
              ids={currentIds}
              onPush={onPush}
              childMap={childMap}
              contentType={"REACTIONS"}
              onReplyClick={setReplyingTo}
            />
          ) : null
        ) : (
          <LeafView
            room={room}
            tree={tree}
            onPush={onPush}
            childMap={childMap}
            onReplyClick={setReplyingTo}
          />
        )}
      </div>
      {shouldReply && (
        <Composer replyingState={replyingMode} setReplyingTo={setReplyingTo} />
      )}
    </div>
  );
};

export default Frame;
