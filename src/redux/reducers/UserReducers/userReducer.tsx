import produce from "immer";
import { GameUser } from "../../../models/generic";
import { UserAction } from "../../actions/UserActions/userActions";

export const defaultState: GameUser = {
  errorMessage: "",
  currentCardBackground: "",
  data: undefined,
  loading: false,
  nickname: "",
  user: undefined,
  username: "",
};

const UserReducer = produce((state = defaultState, action: UserAction) => {
  switch (action.type) {
    case "USER_LOADING":
      state.errorMessage = "";
      state.loading = true;
      break;
    case "USER_SIGNUP_SUCCESS":
      state.loading = false;
      state.user = action.payload;
      break;
    case "USER_SIGNUP_ERROR":
      state.loading = false;
      state.errorMessage = action.payload;
      break;
    case "USER_LOGIN_SUCCESS":
      state.loading = false;
      state.user = action.payload;
      break;
    case "USER_LOGIN_ERROR":
      state.loading = false;
      state.errorMessage = action.payload;
      break;
    default:
      return state;
  }
}, defaultState);

export default UserReducer;