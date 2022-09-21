import { useEffect, useReducer } from "react";
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
    sessionStorage.setItem("user", JSON.stringify(user))
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user")
    if(user){
      console.log(JSON.parse(user))
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
