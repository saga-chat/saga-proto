import styled from "styled-components";
import * as React from "react";
import { ReplyingMode } from "../framing/Frame";
import { Id } from "../../data/types/entity";
import { AppState, AppStateDispatcher } from "../../data/reducers/appState";

const ComposerDiv = styled.div<any>`
  padding: 1em;
  display: flex;
  width: 100%;
  max-width: 800px;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

interface ComposerProps {
  appState: AppState;
  dispatch: AppStateDispatcher;
}

const Composer: React.FC<ComposerProps> = ({ appState, dispatch }) => {
  return (
    <ComposerDiv>
      {appState.replyingTo}
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
