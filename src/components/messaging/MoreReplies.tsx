import styled from "styled-components";
import * as React from "react";
import {
  Embellishment,
  Message,
  SagaEvent,
  MessageContent,
  Clusters,
} from "../../types/events";
import { groupBy } from "lodash";
import { idToEvent } from "../../types/utils/buildTree";
import { Id } from "../../types/entity";
import BorderColor from "@material-ui/icons/BorderColor";
import MessageIcon from "@material-ui/icons/Message";

const More = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 300;
  font-size: 0.75em;
  color: grey;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.03);
  padding: 5px 10px 5px 10px;
  margin: 5px 0 0 1em;
  cursor: pointer;
  user-select: none;
  display: inline-block;
  transition: 0.2s;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
    transition: 0.2s;
  }
`;

const MoreReplies: React.FC<{ childEvents: Clusters; tree: idToEvent }> = ({
  childEvents,
  tree,
}) => {
  const contents = childEvents
    .flat()
    .map((id: Id) => tree[id].contents)
    .flat() as MessageContent[];
  const collected = groupBy(contents, (content: MessageContent) => {
    switch (content.kind) {
      case "reaction":
        return `reaction-${content.emoji}`;
        break;
      case "image":
        return `image-${content.uri}`;
        break;
      default:
        return content.kind;
    }
  });

  const iconified = Object.values(collected)
    .sort((a, b) => b.length - a.length)
    .map((contents: MessageContent[], i: number) => {
      switch (contents[0].kind) {
        case "reaction":
          return (
            <span role="img" key={i}>
              {contents[0].emoji}
              {contents.length > 1 && ` (${contents.length})`}
            </span>
          );
        case "highlight":
          return (
            <span role="img" key={i}>
              <BorderColor />
              {contents.length > 1 && ` (${contents.length})`}
            </span>
          );
        case "markdown":
          return (
            <span role="img" key={i}>
              <MessageIcon />
              {` (${contents.length}) more`}
            </span>
          );
        case "image":
          return (
            <span role="img" key={i}>
              <img src={contents[0].uri} />
            </span>
          );
      }
    });
  return <More>{iconified}</More>;
};

export default MoreReplies;
