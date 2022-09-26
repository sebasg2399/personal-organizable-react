import { Link, useParams } from "react-router-dom";
import { BoardLayout } from "../../layouts";
import { ListsProvider } from "../../context/listsContext/listsProvider";
import { BoardContent } from "../../components";

export const BoardPage = () => {
  const { id } = useParams();

  return id ? (
    <ListsProvider id={Number(id)}>
      <BoardLayout>
        <header className="page-header">
          <Link to="/myboards">
            <h2>{"{ organizable }"}</h2>
          </Link>
        </header>
        <BoardContent />
      </BoardLayout>
    </ListsProvider>
  ) : (
    <div>Board not found</div>
  );
};
