import styled from "styled-components";
import * as React from "react";
import { Embellishment, Message } from "../../types/events";

const MoreText = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 300;
  font-size: 10px;
  color: grey;
`;

// TODO: collect

const MoreReplies: React.FC<{ replies: (Message | Embellishment)[] }> = ({
  replies,
}) => {
  return <pre>unaccounted for</pre>;
};

export default MoreReplies;
