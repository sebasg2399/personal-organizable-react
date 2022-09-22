import { useCallback, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./userContext";
import { userReducer } from "./userReducer";

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
}

export const UserProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setUser = (user: User) => {
    dispatch({ type: "setUser", payload: user });
  };
  const LogOut = () => {
    dispatch({ type: "logout" });
    sessionStorage.clear();
    window.location.replace("/login")
  };
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      console.log(user)
      dispatch({ type: "setUser", payload: JSON.parse(user) });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, setUser, LogOut }}>
      {children}
    </UserContext.Provider>
  );
};
