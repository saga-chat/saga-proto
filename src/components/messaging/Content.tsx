import styled from "styled-components";
import * as React from "react";
import { MessageContent } from "../../types/events";

const TextBody = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 300;
  font-size: 15px;
`;

const Content: React.FC<{
  content: MessageContent;
  childContent: MessageContent[];
}> = ({ content, childContent }) => {
  if (content.kind === "markdown") {
    return <TextBody>{content.contents}</TextBody>;
  } else if (content.kind === "image") {
    return <img src={content.uri} />;
  }
  return <pre>unimplemented</pre>;
};

export default Content;
