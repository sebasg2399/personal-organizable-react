import styled from "@emotion/styled";
import { Board } from "../../interfaces";

type Props = {
  boards: Board[];
  children?: any;
  BoardCardTemplate: any;
};

const StyledBoards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 12rem);
  gap: 2rem 1rem;
`;

export const ListBoards = ({ boards, BoardCardTemplate, children }: Props) => {
  return (
    <StyledBoards>
      {boards.length > 0 &&
        boards.map((board) => (
          <BoardCardTemplate key={board.id} board={board}></BoardCardTemplate>
        ))}
      {children}
    </StyledBoards>
  );
};
