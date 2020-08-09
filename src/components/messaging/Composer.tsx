import styled from "styled-components";
import * as React from "react";
import { ReplyingMode } from "../framing/Frame";
import { Id } from "../../data/types/entity";
import {
  AppState,
  AppStateDispatcher,
  setReplyingTo,
} from "../../data/reducers/appState";
import Content from "./Content";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

const ComposerDiv = styled.div<any>`
  padding: 1em;
  width: 100%;
  max-width: 800px;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 1em;
`;

const ComposerRow = styled.div`
  display: flex;
  width: 100%;
`;

const ReplyingToChip = styled.div<any>`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 300px;
  max-height: 200px;
  overflow: hidden;
  padding: 1em 1em 0.5em 1em;
`;

interface ComposerProps {
  appState: AppState;
  dispatch: AppStateDispatcher;
}

const Composer: React.FC<ComposerProps> = ({ appState, dispatch }) => {
  const replyingToContent =
    appState.replyingTo !== null
      ? appState.idToEvent[appState.replyingTo]
      : null;
  return (
    <ComposerDiv>
      {replyingToContent && replyingToContent.kind === "message" && (
        <ReplyingToChip>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "12px" }}>
              Replying to{" "}
              <span style={{ fontWeight: 600 }}>
                {replyingToContent.creator}
              </span>
            </div>
            <IconButton
              onClick={() => dispatch(setReplyingTo(null))}
              size="small"
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </div>
          <Content content={replyingToContent.contents[0]} childContent={[]} />
        </ReplyingToChip>
      )}
      <ComposerRow>
        <input
          type="text"
          style={{
            width: "100%",
          }}
        />
      </ComposerRow>
    </ComposerDiv>
  );
};

export default Composer;
