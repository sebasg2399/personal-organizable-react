import React, { useEffect, useReducer, useState } from "react";
import { ListsContext } from "./listsContext";
import { listsAction, listsReducer, updatePos } from "./listsReducer";
import { apifetch } from "../../services/apifetch";
import { TList } from "../../interfaces";

type Props = {
  children: JSX.Element | JSX.Element[];
  id: number;
};

export interface ListsState {
  lists: TList[];
}
const INITIAL_STATE = {
  lists: [],
};
export interface BoardInfo {
  color: string;
  name: string;
  id: number;
  starred: boolean;
}

export const ListsProvider = ({ children, id }: Props) => {
  const [state, dispatch]: [ListsState, (action: listsAction) => void] =
    useReducer(listsReducer, INITIAL_STATE);
  const [boardInfo, setBoardInfo] = useState<BoardInfo>({
    color: "white",
    name: "Cargando...",
    id: -1,
    starred: false,
  });
  useEffect(() => {
    apifetch
      .get(`boards/${id}/`)
      .then(({ data }) => {
        const fLists = data.lists.map((list: TList) => ({
          ...list,
          id: list.listId,
        }));
        dispatch({ type: "setLists", payload: fLists });
        setBoardInfo({
          color: data.color,
          name: data.name,
          id: Number(data.id),
          starred: data.starred,
        });
      })
      .catch((e) => console.log(e.message));
  }, [id]);

  const setLists = (nlists: TList[]) => {
    dispatch({ type: "setLists", payload: nlists });
  };

  const editList = (modifiedList: TList): void => {
    // console.log(state)
    console.log(modifiedList);
    const { lists } = { ...state };
    const idx = lists.findIndex((list) => list.id === modifiedList.id);
    lists[idx] = { ...modifiedList };
    dispatch({ type: "EditList", payload: lists });
  };
  const removeList = (id: number): void => {
    dispatch({ type: "RemoveList", payload: id });
  };
  const addList = (list: TList): void => {
    dispatch({ type: "AddList", payload: list });
  };
  const reorderLists = (source: number, dest: number): void => {
    const { lists } = { ...state };
    const [removed] = lists.splice(source, 1);
    lists.splice(dest, 0, removed);
    const nlists = updatePos(lists);
    const order = nlists.map((list) => list.listId);
    apifetch.post(`boards/${boardInfo.id}/lists/sort`, { ids: order });
    dispatch({ type: "setLists", payload: nlists });
  };
  return (
    <ListsContext.Provider
      value={{
        ...state,
        boardInfo,
        editList,
        removeList,
        addList,
        reorderLists,
        setLists,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};
