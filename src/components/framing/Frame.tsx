import styled from "styled-components";
import * as React from "react";
import { Room } from "../../types/room";
import buildTree, { idToEvent } from "../../types/utils/buildTree";
import Conversation from "../messaging/Conversation";
import { Id } from "../../types/entity";
import BigChip from "./BigChip";
import { AppData } from "../../types/appdata";
import { DummyAppDataContext } from "../../types/dummy/dummyAppData";

const getCurrentDepth = (id: Id | null, tree: idToEvent): number =>
  id !== null && tree[id].parent !== null
    ? getCurrentDepth(tree[id].parent as any, tree) + 1
    : 0;

const ReplyBreadcrumb = styled.div`
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  padding: 1em;
  margin-bottom: 1em;
`;

const Frame: React.FC = () => {
  const appData = React.useContext(DummyAppDataContext);
  const room = appData.knownRooms[appData.myRooms[0]];
  const { events } = room;
  const [tree, treeTop, childMap] = buildTree(events);
  const [currentParent, setCurrentParent] = React.useState<string | null>(null);
  const currentDepth = getCurrentDepth(currentParent, tree);
  const currentIds = currentParent !== null ? childMap[currentParent] : treeTop;
  return (
    <div>
      {currentParent !== null && (
        <ReplyBreadcrumb>
          <BigChip
            onPush={setCurrentParent}
            message={tree[currentParent] as any}
            childEvents={[]}
            room={room}
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
