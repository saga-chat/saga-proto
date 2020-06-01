import styled from "styled-components";
import * as React from "react";

const SideBtns = styled.div<any>`
  display: inline-block;
  visibility: ${({ show }: any) => (show ? "default" : "hidden")};
`;

const SideButtons: React.FC<{ embellishing: boolean; show: boolean }> = ({
  embellishing,
  show,
}) => {
  return (
    <SideBtns show={show}>
      <button>reply</button>
      <button>embellish</button>
      <button>edit</button>
      <button>mark unread</button>
    </SideBtns>
  );
};

export default SideButtons;
