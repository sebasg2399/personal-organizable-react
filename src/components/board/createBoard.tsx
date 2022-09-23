import styled from "@emotion/styled";
import { useContext, useState } from "react";
import { colors, typography } from "../../assets";
import { Modal } from "../modal";
import { BoardCard } from "./boardCard";
import { MdOutlineClose } from "react-icons/md";
import { apifetch } from "../../services/apifetch";
import { BoardsContext } from "../../context";
const StyledCreateBoard = styled.div`
  background: transparent;
  border: 4px solid ${colors.secondary["200"]};
  border-radius: 0.5rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CreateBoardInput = styled.input`
  background-color: rgba(255, 255, 255, 0.5);
  outline: none;
  border: none;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  border-radius: 0.5rem;
  padding: 0 0.25rem;
`;

const StyledPickColor = styled.div<any>`
  background-color: ${(props) => props.bgColor};
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const PickColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2rem);
  gap: 0.5rem;
`;

const PickColor = ({ onClick, bgColor }: any) => {
  return (
    <StyledPickColor
      onClick={() => {
        onClick(bgColor);
      }}
      bgColor={bgColor}
    ></StyledPickColor>
  );
};

const CreateBoardSubmit = styled.button`
  background-color: white;
  outline: none;
  border: none;
  padding: 0.375rem 0.625rem;
  border-radius: 0.25rem;
  color: ${colors.secondary["400"]};
  font-weight: 500;
  font-family: ${typography.primary};
  cursor: pointer;
`;

const INITIAL_STATE = { color: "#90DBAF", name: "" };

export const CreateBoard = ({ children }: any) => {
  const [creating, toggle] = useState(false);
  const [newboard, setnewboard] = useState(INITIAL_STATE);
  const { addBoard } = useContext(BoardsContext);
  const onNameChange = (e: any) => {
    const name = e.target.value;
    setnewboard({ ...newboard, name });
  };
  const onColorChange = (bgcolor: any) => {
    const color = bgcolor;
    setnewboard({ ...newboard, color });
  };
  const Submit = (e: any) => {
    e.stopPropagation();
    if (newboard.name) {
      apifetch
        .post("/boards", newboard)
        .then(({ data }) => {
          addBoard(data);
          setnewboard(INITIAL_STATE);
          toggle(false);
        })
        .catch((e) => console.log(e.message));
    }
  };
  return (
    <StyledCreateBoard
      onClick={(e) => {
        e.stopPropagation();
        toggle(true);
      }}
    >
      {children}
      {creating && (
        <Modal>
          <Modal.Wrapper>
            <div>
              <BoardCard bgColor={newboard.color}>
                <CreateBoard.Input
                  onChange={onNameChange}
                  placeholder="Board name"
                />
                <BoardCard.Control>
                  <CreateBoard.Submit onClick={Submit}>
                    CREATE
                  </CreateBoard.Submit>
                </BoardCard.Control>
              </BoardCard>
            </div>
            <PickColorGrid>
              <PickColor onClick={onColorChange} bgColor={"#90DBAF"} />
              <PickColor onClick={onColorChange} bgColor={"#F77474"} />
              <PickColor onClick={onColorChange} bgColor={"#60B5E5"} />
              <PickColor onClick={onColorChange} bgColor={"#FFA759"} />
              <PickColor onClick={onColorChange} bgColor={"#C499EC"} />
              <PickColor onClick={onColorChange} bgColor={"#FABBD0"} />
              <PickColor onClick={onColorChange} bgColor={"#42D781"} />
              <PickColor onClick={onColorChange} bgColor={"#BDBDBD"} />
              <PickColor onClick={onColorChange} bgColor={"#9DE0F9"} />
            </PickColorGrid>
            <Modal.Exit
              onClick={(e: any) => {
                e.stopPropagation();
                toggle(false);
              }}
            >
              <MdOutlineClose size={"2rem"} />
            </Modal.Exit>
          </Modal.Wrapper>
        </Modal>
      )}
    </StyledCreateBoard>
  );
};
CreateBoard.Input = CreateBoardInput;
CreateBoard.Submit = CreateBoardSubmit;
