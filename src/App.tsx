import { Global } from "./assets";
import { UserContext } from "./context";
import { useContext } from "react";
import { AuthorizedApp } from "./AuthorizedApp";
import { UnauthorizedApp } from "./UnauthorizedApp";

// const ProtectedRoute = ({ children }: any) => {
//   const { user } = useContext(UserContext)
//   if (!user) {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };


function App() {
  const {user} = useContext(UserContext)
  return (
    <>
      <Global />
      {user ? <AuthorizedApp /> : <UnauthorizedApp />}
    </>
  );
}

export default App;
