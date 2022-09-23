import React, { useContext } from "react";
import { BoardCard, ListBoards, Sidebar } from "../../components/";
import { Board, BoardsContext } from "../../context";
import { BiTrash } from "react-icons/bi";
import { AppLayout, MainLayout } from "../../layouts";
import { apifetch } from "../../services/apifetch";
import { HiArrowUp } from "react-icons/hi";

export const ClosedBoards = () => {
  const { boards, closeHandler, removeBoard } = useContext(BoardsContext);

  const deletedBoards = (boards: Board[]) => {
    return boards.filter((board) => board.closed);
  };

  const DeletedTemplate = ({ board }: any) => {
    return (
      <BoardCard bgColor={board.color}>
        <p>{board.name}</p>
        <BoardCard.Control>
          <BoardCard.IconWrapper
            onClick={() => {
              closeHandler(board, false);
              apifetch.patch(`/boards/${board.id}`, {
                closed: false,
              });
            }}
          >
            <HiArrowUp size={"1.25rem"} />
          </BoardCard.IconWrapper>
          <BoardCard.IconWrapper
            onClick={() => {
              removeBoard(board);
              apifetch.delete(`/boards/${board.id}`);
            }}
          >
            <BiTrash size={"1.25rem"} />
          </BoardCard.IconWrapper>
        </BoardCard.Control>
      </BoardCard>
    );
  };

  return (
    <AppLayout>
      <Sidebar />
      <MainLayout title="Closed Boards">
        {boards && deletedBoards(boards).length > 0 ? (
          <ListBoards
            BoardCardTemplate={DeletedTemplate}
            boards={deletedBoards(boards)}
          />
        ) : (
          <h2>No hay boards</h2>
        )}
      </MainLayout>
    </AppLayout>
  );
};
