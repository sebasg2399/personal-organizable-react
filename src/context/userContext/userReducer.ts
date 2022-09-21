import { User, UserState } from "./userProvider";

type UserAction = {
  type: "setUser";
  payload: User;
};

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "setUser":
        // console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        user: {...action.payload}
      };
  }
  return state;
};
