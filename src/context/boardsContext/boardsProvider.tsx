import { useContext, useEffect, useReducer } from "react";
import { Board } from "../../interfaces";
import { apifetch } from "../../services/apifetch";
import { UserContext } from "../userContext";
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


export const BoardsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(boardsReducer, INITIAL_STATE);
  const {LogOut} = useContext(UserContext)
  const setBoards = (boards: Board[]) => {
    dispatch({ type: "setBoards", payload: boards });
  };
  const starHandler = (board: Board, starred: boolean) => {
    if (state.boards) {
      board.starred = starred;
      dispatch({ type: "updateBoard" });
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
  const addBoard=(board:Board)=>{
    if(board && state.boards){
      dispatch({type: "setBoards", payload: [board, ...state.boards]})
    }
  }
  const closeHandler = (board: Board, closed: boolean) => {
    if (state.boards) {
      board.closed = closed;
      dispatch({ type: "updateBoard" });
    }
  };
  useEffect(() => {
    apifetch
      .get("/boards")
      .then(({ data }) => setBoards(data)).catch(e=>{
        LogOut();
      });
  }, []);
  return (
    <BoardsContext.Provider
      value={{ ...state, setBoards, starHandler, closeHandler, removeBoard, addBoard }}
    >
      {children}
    </BoardsContext.Provider>
  );
};
