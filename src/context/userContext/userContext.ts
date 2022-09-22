import { createContext } from "react";
import { User } from "./userProvider";



export interface UserContextProps {
    isLoading: boolean;
    user?: User;

    //Methods
    setUser: (user: User)=>void
    LogOut: ()=>void

}

export const UserContext = createContext<UserContextProps>({} as UserContextProps)