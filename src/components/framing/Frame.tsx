import styled from "styled-components";
import * as React from "react";
import { Room } from "../../types/room";
import buildTree, { idToEvent } from "../../types/utils/buildTree";
import Conversation from "../messaging/Conversation";
import { Id } from "../../types/entity";
import BigChip from "./BigChip";
import { AppData } from "../../types/appdata";
import { DummyAppDataContext } from "../../types/dummy/dummyAppData";
import Bubble, { BubbleMode } from "../messaging/Bubble";
import { Message } from "../../types/events";
import { Propic, CreatorDiv } from "../messaging/Cluster";
import { purple_primary } from "../../colors";

const getCurrentDepth = (id: Id | null, tree: idToEvent): number =>
  id !== null && tree[id].parent !== null
    ? getCurrentDepth(tree[id].parent as any, tree) + 1
    : 0;

const ReplyBreadcrumb = styled.div`
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
  return (
    <div>
      {currentParent !== null && (
        <ReplyBreadcrumb>
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
        </ReplyBreadcrumb>
      )}
      <Conversation
        room={room}
        tree={tree}
        ids={currentIds}
        onPush={setCurrentParent}
        childMap={childMap}
      />
    </div>
  );
};

export default Frame;
