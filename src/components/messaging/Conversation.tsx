import styled from "styled-components";
import * as React from "react";
import { IdArr } from "../../types/events";
import { Room } from "../../types/room";
import buildTree from "../../types/utils/buildTree";
import Cluster from "./Cluster";

const Conversation: React.FC<{ room: Room }> = ({ room }) => {
  const { events } = room;
  const [tree, clustered] = buildTree(events);
  console.log(tree, clustered);
  return (
    <div>
      {clustered.map((cluster: IdArr, i: number) => (
        <Cluster key={i} cluster={cluster} tree={tree} />
      ))}
    </div>
  );
};

export default Conversation;
