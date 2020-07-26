import styled from "styled-components";
import * as React from "react";
import { Room } from "../../types/room";
import buildTree, { idToEvent } from "../../types/utils/buildTree";
import TreeView, { clusterSubstantives } from "../messaging/TreeView";
import { Id } from "../../types/entity";
import BigChip from "./BigChip";
import { AppData } from "../../types/appdata";
import { DummyAppDataContext } from "../../types/dummy/dummyAppData";
import Bubble, { BubbleMode } from "../messaging/Bubble";
import { Message } from "../../types/events";
import { Propic, CreatorDiv } from "../messaging/Cluster";
import { purple_primary } from "../../colors";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ChatBubble from "@material-ui/icons/ChatBubble";
import EmojiEmoticons from "@material-ui/icons/EmojiEmotions";
import Badge from "@material-ui/core/Badge";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import isTerminalReaction from "../../types/utils/isTerminalReaction";

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

  const substantives =
    currentParent !== null
      ? clusterSubstantives(currentIds, tree, childMap)
      : [];

  const terminalReactions =
    currentParent !== null
      ? currentIds.filter((id) => isTerminalReaction(id, tree, childMap))
      : [];
  return (
    <div style={{ display: "flex", flexFlow: "column", height: "100vh" }}>
      <Breadcrumb>
        {currentParent !== null ? (
          <>
            <BackButton
              onClick={() => setCurrentParent(tree[currentParent].parent)}
            >
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
          <BackButton>{room.name}</BackButton>
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
        {currentTab === 0 || currentParent === null ? (
          <TreeView
            room={room}
            tree={tree}
            ids={currentIds}
            onPush={setCurrentParent}
            childMap={childMap}
            contentType={"SUBSTANTIVES"}
          />
        ) : null}

        {currentTab === 1 && (
          <TreeView
            room={room}
            tree={tree}
            ids={currentIds}
            onPush={setCurrentParent}
            childMap={childMap}
            contentType={"REACTIONS"}
          />
        )}
      </div>
      <BottomNavigation showLabels={true}>
        <BottomNavigationAction label="all" />
        <BottomNavigationAction label="new" />
      </BottomNavigation>
    </div>
  );
};

export default Frame;
