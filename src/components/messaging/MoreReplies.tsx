import styled from "styled-components";
import * as React from "react";
import { Embellishment, Message, SagaEvent } from "../../types/events";

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

const MoreReplies: React.FC<{ childEvents: SagaEvent[] }> = ({
  childEvents,
}) => {
  const iconified = childEvents.map((event: SagaEvent) => {
    switch (event.kind) {
    }
  });
  return <More>{childEvents.flat().length} more:</More>;
};

export default MoreReplies;
