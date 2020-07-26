import styled from "styled-components";
import * as React from "react";
import { MessageContent } from "../../types/events";
import ReactMarkdown from "react-markdown";

const TextBody = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 300;
  font-size: 15px;
  padding: 6px 12px;
  p {
    padding: 0;
    margin: 0;
  }
`;

const LinkStyled = styled.a`
  color: #ffffff;
`;

const Content: React.FC<{
  content: MessageContent;
  childContent: MessageContent[];
}> = ({ content, childContent }) => {
  switch (content.kind) {
    case "markdown":
      return (
        <TextBody>
          <ReactMarkdown
            source={content.contents}
            disallowedTypes={["image", "imageReference", "heading"]}
            unwrapDisallowed={true}
            renderers={{ link: LinkStyled }}
          />
        </TextBody>
      );
    case "image":
      return (
        <img
          style={{
            display: "block",
            maxWidth: "100%",
            width: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            boxSizing: "border-box",
          }}
          src={content.uri}
          loading="lazy"
        />
      );
    case "reaction":
      return <span>{content.emoji}</span>;
    default:
      return <pre>unimplemented</pre>;
  }
};

export default Content;
