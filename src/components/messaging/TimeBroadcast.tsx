import styled from "styled-components";
import * as React from "react";
import { Embellishment, Message } from "../../data/types/events";

const MoreText = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 300;
  font-size: 10px;
  color: grey;
`;

// TODO: collect

const TimeBroadcast: React.FC<{ replies: (Message | Embellishment)[] }> = ({
  replies,
}) => {
  return <pre>unaccounted for</pre>;
};

export default TimeBroadcast;
