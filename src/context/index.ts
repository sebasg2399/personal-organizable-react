import { useContext } from "react";
import { ListsContext } from "./listsContext/listsContext";
import { ListsState } from "./listsContext/listsProvider";
export { UserContext, userReducer, UserProvider } from "./userContext/";
export { ListsContext, ListsProvider, listsReducer } from "./listsContext/";
export { BoardsContext, boardsReducer, BoardsProvider } from "./boardsContext/";

export const useLists = () => useContext(ListsContext);
