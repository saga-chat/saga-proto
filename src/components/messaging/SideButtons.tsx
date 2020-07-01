import styled from "styled-components";
import * as React from "react";
import { IconButton } from "@material-ui/core";
import Reply from "@material-ui/icons/Reply";
import Edit from "@material-ui/icons/Edit";
import BorderColor from "@material-ui/icons/BorderColor";
import Visibility from "@material-ui/icons/Visibility";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

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
}

export type SideButtonsProps = SideButtonsData & { show: boolean };

const SideButtons: React.FC<SideButtonsProps> = ({
  selected,
  show,
  onReplyClick,
}) => {
  return (
    <SideBtns show={show}>
      <Tooltip title="reply" TransitionComponent={Zoom}>
        <IconButton onClick={onReplyClick}>
          <Reply />
        </IconButton>
      </Tooltip>
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
      ) : (
        <>
          <Tooltip title="edit" TransitionComponent={Zoom}>
            <IconButton>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="mark unread" TransitionComponent={Zoom}>
            <IconButton>
              <Visibility />
            </IconButton>
          </Tooltip>
        </>
      )}
    </SideBtns>
  );
};

export default SideButtons;
