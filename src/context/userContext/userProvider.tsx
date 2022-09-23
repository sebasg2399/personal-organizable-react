import { useEffect, useReducer } from "react";
import { UserContext } from "./userContext";
import { userReducer } from "./userReducer";
import { apifetch } from "../../services/apifetch";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface UserState {
  isLoading: boolean;
  user?: User;
}

const INITIAL_STATE = {
  isLoading: true,
  user: undefined,
};

export interface User {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  token: string;
  id: number;
}

export const UserProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setUser = (user: User) => {
    dispatch({ type: "setUser", payload: user });
  };
  const LogOut = () => {
    dispatch({ type: "logout" });
    sessionStorage.clear();
    window.location.replace("/login");
  };
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      dispatch({ type: "setUser", payload: JSON.parse(user) });
      apifetch.defaults.headers.common["Authorization"] = `Token token=${JSON.parse(user).token}`;
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, setUser, LogOut }}>
      {children}
    </UserContext.Provider>
  );
};
