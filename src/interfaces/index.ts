export interface Board {
  id: number;
  name: string;
  closed: boolean;
  color: string;
  starred: boolean;
  lists: TList[];
}

export interface TList {
  id: number;
  listId: number;
  name: string;
  pos: number;
  cards: TCard[];
}

export interface TCard {
  id: number;
  cardId: number;
  name: string;
  pos: number;
}
