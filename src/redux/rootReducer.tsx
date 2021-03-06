import { combineReducers } from "redux";
import BlackJackReducer from "./reducers/BlackJackReducer/BlackJackReducer";
import UserReducer from "./reducers/UserReducers/UserReducer";

export const rootReducer = combineReducers({
  BlackJackReducer: BlackJackReducer,
  UserReducer: UserReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
