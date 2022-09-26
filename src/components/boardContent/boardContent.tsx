import { useLists } from "../../context";
import styled from "@emotion/styled";
import { CreateList, List } from "../list";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { TList } from "../../interfaces";
import { BiStar } from "react-icons/bi";
import { apifetch } from '../../services/apifetch';

const ListWrapper = styled.div`
  display: flex;
  padding: 1rem 0;
  flex-wrap: wrap;
`;

export const BoardContent = () => {
  const { lists,addList, boardInfo, reorderLists } = useLists();
  const orderFn = (a: TList, b: TList) => a.pos - b.pos;
  const orderList = lists.sort(orderFn);
  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    reorderLists(result.source.index, result.destination.index);

    // apifetch
    // .post(`/boards/${boardInfo.id}/lists/sort`, { ids: posArr })
    // .then(({ data }) => {console.log(data)});

    // const lists = reorder(
    //   this.state.lists,
    //   result.source.index,
    //   result.destination.index
    // );
  };

  return (
    <div className="page-main" style={{ background: boardInfo.color }}>
      <h1>
        {boardInfo.name} {boardInfo.starred && <BiStar size={"1.25rem"} />}
      </h1>
      <ListWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{ display: "flex" }}
                // style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {orderList.map((list) => (
                  <Draggable
                    key={list.id}
                    draggableId={list.listId.toString()}
                    index={list.pos}
                  >
                    {(provided, snapshot) => (
                      <List key={list.id} list={list} provided={provided} />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* {orderList.map((list) => <List key={list.id} list={list}/> )} */}
        </DragDropContext>
        {orderList.length < 4 && (
          <CreateList
            board_id={boardInfo.id}
            createFn={(list: any) => {

              apifetch.post(`/boards/${boardInfo.id}/lists`, list).then(({data})=>{
                const fList: TList = {...data, listId: data.id, cards: []} 
                console.log(fList)
                
                addList(fList)
              })
              
            }}
          />
        )}
      </ListWrapper>
    </div>
  );
};
