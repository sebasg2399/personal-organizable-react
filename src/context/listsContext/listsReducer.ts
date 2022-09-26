import { TList } from "../../interfaces";
import { ListsState } from "./listsProvider";

export type listsAction =
  | {
      type: "setLists";
      payload: TList[];
    }
  | {
      type: "EditList";
      payload: TList[];
    }
  | { type: "RemoveList"; payload: number }
  | {
      type: "AddList";
      payload: TList;
    };

export const updatePos = (lists: TList[]): TList[] => {
  return lists.map((list, i) => ({ ...list, pos: i }));
};
export const listsReducer = (state: ListsState, action: listsAction) => {
  const { lists } = { ...state };
  switch (action.type) {
    case "setLists":
      return { ...state, lists: action.payload };
    case "EditList":
      return { ...state, lists: action.payload };
    case "RemoveList":
      const idx = lists.findIndex((list) => list.id === action.payload);
      lists.splice(idx, 1);
      const nLists = updatePos(lists);
      return { ...state, lists: nLists };
    case "AddList":
      return { ...state, lists: [...lists, action.payload] };
  }

  return { ...state };
};
