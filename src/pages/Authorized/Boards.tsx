import { BoardCard, ListBoards, Sidebar } from "../../components/";
import { AppLayout, MainLayout } from "../../layouts";
import { useContext } from "react";
import { Board, BoardsContext } from "../../context";
import { BiTrash } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { apifetch } from "../../services/apifetch";

type BoardProps = {
  board: Board;
};

export const Boards = () => {
  const { boards, starHandler, closeHandler } = useContext(BoardsContext);

  const simpleBoards = (boards: Board[]) => {
    const noClosed = boards.filter((board) => !board.closed);
    return noClosed.filter((board) => !board.starred);
  };
  const starredBoards = (boards: Board[]) => {
    const noClosed = boards.filter((board) => !board.closed);
    return noClosed.filter((board) => board.starred);
  };

  const Template = ({ board }: BoardProps) => {
    return (
      <BoardCard board={board}>
        <BoardCard.Control>
          <BoardCard.IconWrapper
            onClick={() => {
              closeHandler(board, true);
              apifetch.patch(`/boards/${board.id}`, {
                closed: true,
              });
            }}
          >
            <BiTrash size={"1.25rem"} />
          </BoardCard.IconWrapper>
          <BoardCard.IconWrapper
            onClick={() => {
              starHandler(board, true);
              apifetch.patch(`/boards/${board.id}`, {
                starred: true,
              });
            }}
          >
            <AiFillStar
              size={"1.25rem"}
              strokeWidth={"4rem"}
              fill={"transparent"}
            />
          </BoardCard.IconWrapper>
        </BoardCard.Control>
      </BoardCard>
    );
  };

  const StarredTemplate = ({ board }: any) => {
    return (
      <BoardCard board={board}>
        <BoardCard.Control>
          <BoardCard.IconWrapper
            onClick={() => {
              closeHandler(board, true);
              apifetch.patch(`/boards/${board.id}`, {
                closed: true,
              });
            }}
          >
            <BiTrash size={"1.25rem"} />
          </BoardCard.IconWrapper>
          <BoardCard.IconWrapper
            onClick={() => {
              starHandler(board, false);
              apifetch.patch(`/boards/${board.id}`, {
                starred: false,
              });
            }}
          >
            <AiFillStar size={"1.25rem"} />
          </BoardCard.IconWrapper>
        </BoardCard.Control>
      </BoardCard>
    );
  };
  const ListStarredBoards = (boards: Board[]) => {
    if (starredBoards(boards).length > 0) {
      return (
        <>
          <h2>Starred Boards</h2>
          <ListBoards
            BoardCardTemplate={StarredTemplate}
            boards={starredBoards(boards)}
          />
        </>
      );
    }
  };

  return (
    <AppLayout>
      <Sidebar />
      <MainLayout title="My Boards">
        {boards && ListStarredBoards(boards)}

        <h2>Boards</h2>
        {boards && (
          <ListBoards
            BoardCardTemplate={Template}
            boards={simpleBoards(boards)}
          />
        )}
      </MainLayout>
    </AppLayout>
  );
};
