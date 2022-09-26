import { createContext } from "react";
import { Board } from "../../interfaces";

export interface BoardContextProps {
  isLoading: boolean;
  boards?: Board[];
  //methods
  setBoards: (boards: Board[]) => void;
  starHandler: (board: Board, starred: boolean) => void;
  closeHandler: (board: Board, closed: boolean) => void;
  removeBoard: (board: Board) => void;
  addBoard: (board: Board) =>void
}
export const BoardsContext = createContext<BoardContextProps>(
  {} as BoardContextProps
);
