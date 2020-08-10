import styled from "styled-components";
import * as React from "react";
import { ReplyingMode } from "../framing/Frame";
import { Id } from "../../data/types/entity";
import {
  AppState,
  AppStateDispatcher,
  setReplyingTo,
  sendMdMessage,
} from "../../data/reducers/appState";
import Content from "./Content";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { purple_primary } from "../../colors";
import { useCallback } from "react";

const ComposerDiv = styled.div<any>`
  padding: 1em;
  width: 100%;
  max-width: 800px;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 1em;
  display: ${({ show }: any) => (show ? "visible" : "none")};
`;

const ComposerRow = styled.div`
  display: flex;
  width: 100%;
`;

const ReplyingToChip = styled.div<any>`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-height: 200px;
  overflow: hidden;
  padding: 1em 1em 0.5em 1em;
  margin-bottom: 1em;
`;

const ComposerInput = styled.input`
  background-color: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.7);
  font-size: 1em;
  border-radius: 100px;
  border: 1px solid rgba(0, 0, 0, 0);
  outline: none;
  padding: 5px 10px 5px 10px;
  box-sizing: border-box;
  flex: 2;
  :focus {
    border: 1px solid ${purple_primary};
  }
`;

interface ComposerProps {
  appState: AppState;
  dispatch: AppStateDispatcher;
  show: boolean;
}

const Composer: React.FC<ComposerProps> = ({ appState, dispatch, show }) => {
  const replyingToContent =
    appState.replyingTo !== null
      ? appState.idToEvent[appState.replyingTo]
      : null;

  const [inputVal, setInputVal] = React.useState("");
  const inputRef = React.useRef<any>();
  const onKey = useCallback(
    (e: any) => {
      if (e.key === "Enter") {
        dispatch(sendMdMessage(inputVal, appState.replyingTo));
        setInputVal("");
        dispatch(setReplyingTo(null));
      }
    },
    [dispatch, inputVal, appState.replyingTo]
  );
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [appState.replyingTo]);
  return (
    <ComposerDiv show={show}>
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
          <div style={{ maxWidth: 300 }}>
            <Content
              content={replyingToContent.contents[0]}
              childContent={[]}
            />
          </div>
        </ReplyingToChip>
      )}
      <ComposerRow>
        <ComposerInput
          type="text"
          placeholder="enter a message"
          value={inputVal}
          onChange={(e: any) => setInputVal(e.target.value)}
          onKeyPress={onKey}
          ref={inputRef}
        />
      </ComposerRow>
    </ComposerDiv>
  );
};

export default Composer;
