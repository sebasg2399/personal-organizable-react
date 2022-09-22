import { User, UserState } from "./userProvider";

type UserAction = {
  type: "setUser";
  payload: User;
}
|{
  type: "logout";
}
;

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
        user: { ...action.payload },
      };
    case "logout":
      return {
        ...state,
        isLoading: true,
        user: undefined
      }
  }
  return state;
};
