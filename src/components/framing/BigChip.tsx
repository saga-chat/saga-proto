import styled from "styled-components";
import * as React from "react";
import { Clusters, Message, MessageContent } from "../../data/types/events";
import { Room } from "../../data/types/room";
import buildTree, { idToEvent } from "../../data/utils/buildTree";
import { Id } from "../../data/types/entity";
import Content from "../messaging/Content";
import { DummyAppDataContext } from "../../data/dummy/dummyAppData";
import { useContext } from "react";

const BigChipDiv = styled.div`
  background-color: rgba(97, 74, 236, 0.1);
  transition: 0.2s;
  :hover {
    transition: 0.2s;
    background-color: rgba(97, 74, 236, 0.2);
  }
  border-radius: 8px;
  padding: 1em;
  box-sizing: border-box;
  cursor: pointer;
  font-family: "Inter", sans-serif;
`;

const BigChip: React.FC<{
  message: Message;
  room: Room;
  onPush(id: Id): void;
  childEvents: Clusters;
}> = ({ message, room, onPush }) => {
  // read list
  const { knownUsers } = useContext(DummyAppDataContext);
  return (
    <BigChipDiv onClick={() => onPush(message.parent as any)}>
      <span style={{ fontStyle: "italic" }}>in reply to</span>
      <span style={{ fontWeight: 600, fontSize: "1em", marginLeft: "10px" }}>
        {knownUsers[message.creator].display_name}
      </span>
      {message.contents.map((content: MessageContent, i: number) => (
        <Content content={content} childContent={[]} key={i} />
      ))}
    </BigChipDiv>
  );
};

export default BigChip;
