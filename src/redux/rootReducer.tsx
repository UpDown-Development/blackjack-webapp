import { combineReducers } from "redux";
import BlackJackReducer from "./reducers/BlackJackReducer/blackJackReducer";
import UserReducer from "./reducers/UserReducers/userReducer";

export const rootReducer = combineReducers({
  BlackJackReducer: BlackJackReducer,
  UserReducer: UserReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
