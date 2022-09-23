import { useEffect, useReducer } from "react";
import { apifetch } from "../../services/apifetch";
import { BoardsContext } from "./boardsContext";
import { boardsReducer } from "./boardsReducer";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export interface BoardState {
  isLoading: boolean;
  boards?: Board[];
}

const INITIAL_STATE: BoardState = {
  isLoading: true,
  boards: [],
};

export type Board = {
  id: number;
  name: string;
  closed: boolean;
  color: string;
  starred: boolean;
};

export const BoardsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(boardsReducer, INITIAL_STATE);
  const setBoards = (boards: Board[]) => {
    dispatch({ type: "setBoards", payload: boards });
  };
  const starHandler = (board: Board, starred: boolean) => {
    if (state.boards) {
      board.starred = starred;
      dispatch({ type: "updateBoard" });
      console.log("first");
      // console.log([...state.boards, nboard])
    }
  };
  const removeBoard=(board: Board)=>{
    if (state.boards){
      const boards = [...state.boards]
      const idx = boards.findIndex((b)=>b.id===board.id)
      boards.splice(idx, 1);
      dispatch({type: "removeBoard", payload: boards})
    }
  }
  const closeHandler = (board: Board, closed: boolean) => {
    if (state.boards) {
      board.closed = closed;
      console.log(board)
      dispatch({ type: "updateBoard" });
      // dispatch({type: "closeBoard"})
      // console.log([...state.boards, nboard])
    }
  };
  useEffect(() => {
    apifetch
      .get("/boards")
      .then(({ data }) => setBoards(data));
  }, []);
  return (
    <BoardsContext.Provider
      value={{ ...state, setBoards, starHandler, closeHandler, removeBoard }}
    >
      {children}
    </BoardsContext.Provider>
  );
};
