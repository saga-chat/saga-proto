import styled from "styled-components";
import * as React from "react";
import { IconButton } from "@material-ui/core";
import Reply from "@material-ui/icons/Reply";
import Edit from "@material-ui/icons/Edit";
import BorderColor from "@material-ui/icons/BorderColor";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import Fade from "@material-ui/core/Fade";
import EmojiIcon from "@material-ui/icons/EmojiEmotions";
import { Picker, EmojiData } from "emoji-mart";
import Popover from "@material-ui/core/Popover";

const SideBtns = styled.div<any>`
  display: flex;
  position: absolute;
  top: -10px;
  right: 0;
  justify-content: space-between;
  padding-left: 1em;
  transition: opacity 0.2s;
  opacity: ${({ show }: any) => (show ? "1" : "0")};
`;

export interface SideButtonsData {
  selected: number | null;
  onReplyClick(): void;
  onEmojiPick(emoji: string): void;
  isMe: boolean;
}

export type SideButtonsProps = SideButtonsData & { show: boolean };

const SideButtons: React.FC<SideButtonsProps> = ({
  selected,
  show,
  onReplyClick,
  isMe,
  onEmojiPick,
}) => {
  const [emojiPickerOpen, setEmojiPickerOpen] = React.useState(false);
  React.useEffect(() => {
    if (!show && emojiPickerOpen) {
      setEmojiPickerOpen(false);
    }
  }, [show, emojiPickerOpen]);

  const onEmojiSelect = React.useCallback(
    (emoji: EmojiData) => {
      setEmojiPickerOpen(false);
      onEmojiPick((emoji as any).native);
    },
    [onEmojiPick]
  );
  const pickerAnchor = React.useRef<any>();
  return (
    <SideBtns show={show}>
      <Tooltip title="reply" TransitionComponent={Zoom}>
        <IconButton onClick={onReplyClick}>
          <Reply />
        </IconButton>
      </Tooltip>
      <Tooltip title="react" TransitionComponent={Zoom}>
        <IconButton onClick={() => setEmojiPickerOpen(true)} ref={pickerAnchor}>
          <EmojiIcon />
        </IconButton>
      </Tooltip>
      <Popover
        open={emojiPickerOpen}
        anchorEl={pickerAnchor.current}
        onClose={() => setEmojiPickerOpen(false)}
        TransitionComponent={Fade}
      >
        <Picker
          set="twitter"
          autoFocus={true}
          theme="auto"
          title=""
          onSelect={onEmojiSelect}
        />
      </Popover>

      {selected ? (
        <>
          <Tooltip title="highlight" TransitionComponent={Zoom}>
            <IconButton>
              <BorderColor />
            </IconButton>
          </Tooltip>
          <Tooltip title="react" TransitionComponent={Zoom}>
            <IconButton>
              <InsertEmoticon />
            </IconButton>
          </Tooltip>
        </>
      ) : isMe ? (
        <>
          <Tooltip title="edit" TransitionComponent={Zoom}>
            <IconButton>
              <Edit />
            </IconButton>
          </Tooltip>
        </>
      ) : null}
    </SideBtns>
  );
};

export default SideButtons;
