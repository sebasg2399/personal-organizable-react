import { createContext } from "react";
import { TList } from "../../interfaces";
import { BoardInfo } from "./listsProvider";

export interface ListsContextProps {
  lists: TList[];
  boardInfo: BoardInfo;
  //methods
  editList: (modifiedlist: TList) => void;
  removeList: (id: number) => void;
  addList: (list: TList) => void;
  reorderLists: (source: number, destination: number) => void;
  setLists: (nlists: TList[]) => void;
}
export const ListsContext = createContext<ListsContextProps>(
  {} as ListsContextProps
);
