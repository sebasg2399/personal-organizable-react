import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyBoards, ClosedBoards, MyProfile } from "./pages";
import { BoardsProvider } from "./context/";
import { BoardPage } from "./pages/Authorized/BoardPage";
export const AuthorizedApp = () => {
  return (
    <>
      <BoardsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/myboards" element={<MyBoards />} />
            <Route path="/closedboards" element={<ClosedBoards />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/board/:id" element={<BoardPage />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
            {/* useRoutes([
            { path: "/", element: <Boards /> },
            { path: "/myboards", element: <Boards /> },
            { path: "/closedboards", element: <ClosedBoards /> },
            { path: "/myprofile", element: <MyProfile /> },
            { path: "*", element: <Navigate to="/"  /> },
          ]);*/}
          </Routes>
        </BrowserRouter>
      </BoardsProvider>
    </>
  );
};
