import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Boards, ClosedBoards, MyProfile } from "./pages";
export const AuthorizedApp = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/myboards" element={<Boards />} />
        <Route path="/closedboards" element={<ClosedBoards />} />
        <Route path="/myprofile" element={<MyProfile />} />
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
  </>
);
