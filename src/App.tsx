import { Global } from "./assets";
import { UserContext, UserProvider } from "./context";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { UnauthorizedApp } from "./UnauthorizedApp";

const Main = () => {
  const { user } = useContext(UserContext);
  return <>{user ? "Hay usuario" : <UnauthorizedApp />}</>;
};

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Global />
        <Main />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
