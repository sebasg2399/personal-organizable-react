import { BoardState } from "./boardsProvider";
import { Board } from "../../interfaces";
type boardsAction =
  | {
      type: "setBoards";
      payload: Board[];
    }
  | {
      type: "updateBoard";
    }
  | {
      type: "removeBoard";
      payload: Board[];
    };

export const boardsReducer = (
  state: BoardState,
  action: boardsAction
): BoardState => {
  switch (action.type) {
    case "setBoards":
      return {
        ...state,
        isLoading: false,
        boards: action.payload,
      };
    case "removeBoard":
      return {
        ...state,
        boards: action.payload,
      };
  }
  return { ...state };
};
