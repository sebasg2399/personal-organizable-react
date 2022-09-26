import styled from "@emotion/styled";
import { useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { AiOutlinePlus } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";
import { colors } from "../../assets";
import { useLists } from "../../context";
import { TCard, TList } from "../../interfaces";
import { apifetch } from "../../services/apifetch";
import { AppInput } from "../board/createBoard";
import { Button } from "../button";
import { FaCheckCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
type Props = {
  list: TList;
  provided: DraggableProvided;
};
const StyledList = styled.div`
  background: ${colors.secondary["100"]};
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-flow: column;
  gap: 10px;
  max-width: 17.5rem;
  height: fit-content;
  margin-right: 2rem;

  & .list-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${colors.secondary["300"]};
    padding-bottom: 10px;
    cursor: move;
    justify-content: space-between;
    & .control {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    & h2 {
      cursor: default;
    }
  }
  & svg {
    cursor: pointer;
  }
  & .list-content {
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
  }
  & .list-footer {
    display: flex;
    gap: 10px;
  }
`;

type CardProps = {
  card: TCard;
  deleteCard: any;
};

const StyledCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0.5rem 0.25rem;
  background-color: white;
  border-radius: 0.5rem;
  text-transform: capitalize;
  font-size: 18px;
`;

const Card = ({ card, deleteCard }: CardProps) => {
  return (
    <StyledCard>
      <p>{card.name}</p>
      <BiTrash onClick={() => deleteCard(card)} size={"1.25rem"} />
    </StyledCard>
  );
};
export const List = ({ list, provided }: Props) => {
  const { lists, setLists, editList, removeList, boardInfo } = useLists();
  const [newCard, setNewCard] = useState({ name: "" });
  const [editing, toggleEditing] = useState(false);
  const [name, changeName] = useState(list.name);
  const addCard = () => {
    const { cards } = list;
    apifetch.post(`/lists/${list.listId}/cards`, newCard).then(({ data }) => {
      const fData: TCard = { ...data, cardId: data.id };
      list.cards = [...cards, fData];
      setLists(lists);
      setNewCard({ name: "" });
    });
    // list.cards = [...cards, nCard]
    // setLists(lists)
  };
  const deleteCard = (card: TCard) => {
    const { cards } = list;
    apifetch
      .delete(`/lists/${list.listId}/cards/${card.cardId}`)
      .then(({ data }) => {
        cards.splice(card.pos, 1);
        list.cards = cards;
        setLists(lists);
      });
  };
  return (
    <StyledList ref={provided.innerRef} {...provided.draggableProps}>
      <header {...provided.dragHandleProps} className="list-header">
        <h2>
          {editing ? (
            <AppInput
              defaultValue={name}
              onChange={(e) => {
                changeName(e.target.value);
              }}
            />
          ) : (
            list.name
          )}
        </h2>
        <div className="control">
          {!editing ? (
            <>
              <BiEdit
                size={"1.5rem"}
                onClick={() => {
                  toggleEditing(true);
                }}
              />
              <BiTrash
                size={"1.5rem"}
                onClick={() => {
                  removeList(list.id);
                  apifetch.delete(
                    `boards/${boardInfo.id}/lists/${list.listId}`
                  );
                }}
              />
            </>
          ) : (
            <>
              <FaCheckCircle
                onClick={() => {
                  apifetch
                    .patch(`/boards/${boardInfo.id}/lists/${list.id}/`, {
                      name,
                    })
                    .then(({ data }) => {
                      const fList :TList = {...data, cards: [], listId: data.id} 
                      editList(fList)
                      changeName(list.name);
                      toggleEditing(false);
                    });
                }}
                fill={colors.secondary["400"]}
                size={"1.5rem"}
              />
              <GiCancel
                onClick={() => {
                  changeName(list.name);
                  toggleEditing(false);
                }}
                size={"1.5rem"}
              />
            </>
          )}
        </div>
      </header>
      <main className="list-content">
        {list.cards.map((card) => (
          <Card deleteCard={deleteCard} key={card.cardId} card={card} />
        ))}
      </main>
      <footer className="list-footer">
        <AppInput
          value={newCard.name || ""}
          placeholder="new card"
          onChange={(e) => {
            setNewCard({ name: e.target.value });
          }}
        />
        <Button
          onClick={addCard}
          button_style="secondary"
          leadingIcon={<AiOutlinePlus size={"1rem"} />}
        />
      </footer>
    </StyledList>
  );
};
