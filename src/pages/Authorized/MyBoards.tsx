import { BoardCard, CreateBoard, ListBoards, Sidebar } from "../../components";
import { AppLayout, MainLayout } from "../../layouts";
import { SyntheticEvent, useContext } from "react";
import { BoardsContext } from "../../context";
import { BiTrash } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { apifetch } from "../../services/apifetch";
import { useNavigate } from "react-router-dom";
import { Board } from "../../interfaces";
type BoardProps = {
  board: Board;
};

export const MyBoards = () => {
  const { boards, starHandler, closeHandler } = useContext(BoardsContext);
  const navigate = useNavigate();
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
      <BoardCard
        onClick={(e: SyntheticEvent) => {
          navigate("/board/" + board.id);
        }}
        bgColor={board.color}
      >
        <p>{board.name}</p>
        <BoardCard.Control>
          <BoardCard.IconWrapper
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
              closeHandler(board, true);
              apifetch.patch(`/boards/${board.id}`, {
                closed: true,
              });
            }}
          >
            <BiTrash size={"1.25rem"} />
          </BoardCard.IconWrapper>
          <BoardCard.IconWrapper
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
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
      <BoardCard
        bgColor={board.color}
        onClick={() => {
          navigate("/board/" + board.id);
        }}
      >
        <p>{board.name}</p>
        <BoardCard.Control>
          <BoardCard.IconWrapper
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
              closeHandler(board, true);
              apifetch.patch(`/boards/${board.id}`, {
                closed: true,
              });
            }}
          >
            <BiTrash size={"1.25rem"} />
          </BoardCard.IconWrapper>
          <BoardCard.IconWrapper
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
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

  const ListSimpleBoards = (boards: Board[]) => {
    return (
      <>
        <h2>Boards</h2>
        <ListBoards BoardCardTemplate={Template} boards={simpleBoards(boards)}>
          <CreateBoard
            onClick={(e: any) => {
              console.log(e);
            }}
          >
            Create Board
          </CreateBoard>
        </ListBoards>
      </>
    );
  };

  return (
    <AppLayout>
      <Sidebar />
      <MainLayout title="My Boards">
        {boards && ListStarredBoards(boards)}

        {boards && ListSimpleBoards(boards)}
      </MainLayout>
    </AppLayout>
  );
};
