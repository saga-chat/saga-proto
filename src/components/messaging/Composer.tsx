import styled from "styled-components";
import * as React from "react";
import { ReplyingMode } from "../framing/Frame";
import { Id } from "../../data/types/entity";

const ComposerDiv = styled.div<any>`
  padding: 1em;
  display: flex;
  width: 100%;
  max-width: 800px;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

interface ComposerProps {
  replyingState: ReplyingMode;
  setReplyingTo(id: Id): void;
}

const Composer: React.FC<ComposerProps> = ({
  replyingState,
  setReplyingTo,
}) => {
  return (
    <ComposerDiv>
      {replyingState.replyingTo}
      <input
        type="text"
        style={{
          width: "100%",
        }}
      />
    </ComposerDiv>
  );
};

export default Composer;
