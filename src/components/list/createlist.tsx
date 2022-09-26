import styled from "@emotion/styled";
import { useContext } from "react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { colors } from "../../assets";
import { ListsContext } from "../../context";
import { AppInput } from "../board/createBoard";
import { Button } from "../button";

const StyledCreateList = styled.div`
  width: 17.5rem;
  display: flex;
  background-color: ${colors.secondary["100"]};
  border-radius: 0.5rem;
  padding: 0.5rem;
  gap: 10px;
  height: fit-content;

  & input {
    flex-grow: 1;
  }
`;
type Props = {
  board_id: number;
  createFn: any;
};
export const CreateList = ({ board_id, createFn }: Props) => {
  // const { addList } = useContext(ListsContext);
  const [name, setName] = useState("");
  return (
    <StyledCreateList>
      <AppInput
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="new list"
      />
      <Button
        // onClick={(e: any) => {
        //   apifetch.post(`/boards/${board.id}/lists`, { name }).then(({data}: any) => {
        //     const fixedData = {...data, listId: data.id};
        //     setBoard({
        //       ...board,
        //       lists: [...board.lists, data]
        //   })}).catch(e=>console.log(e.message))
        onClick={()=>createFn({name})}
        button_style="secondary"
        leadingIcon={<AiOutlinePlus size={"1rem"} />}
      />
    </StyledCreateList>
  );
};
