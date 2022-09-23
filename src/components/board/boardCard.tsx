import styled from "@emotion/styled";
import { colors } from "../../assets";
import { type Board } from "../../context";

interface Props {
  board: Board;
  children?: any;
}

const StyledBoardCard = styled.div<Props>`
  background-color: ${(props) => props.board.color};
  width: 190px;
  height: 6rem;
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

const BoardCardControl = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const BoardCard = ({ board, children }: Props) => {
  return (
    <StyledBoardCard board={board}>
      <div>{board.name}</div>
      {children}
    </StyledBoardCard>
  );
};
BoardCard.Control = BoardCardControl;
BoardCard.IconWrapper = styled.div`
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  & svg {
    color: ${colors.secondary["400"]};
  }
`;
