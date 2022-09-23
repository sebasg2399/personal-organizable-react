import styled from "@emotion/styled";
import { Board } from "../../context";

type Props = {
  boards: Board[];
  children?: any;
  BoardCardTemplate: any
};

const StyledBoards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 12rem);
  gap: 2rem 1rem;
`;

export const ListBoards = ({ boards, BoardCardTemplate , children }: Props) => {
    console.log(boards)
  return (
    <StyledBoards>
      {boards.length > 0 ? (
        boards.map((board) => (
          <BoardCardTemplate key={board.id} board={board} ></BoardCardTemplate>
        ))
      ) : (
        <div>No hay boards</div>
      )}
      {children}
    </StyledBoards>
  );
};
