import { combineReducers } from "redux";
import BlackJackReducer from "./reducers/BlackJackReducer/blackJackReducer";

export const rootReducer = combineReducers({
  BlackJackReducer: BlackJackReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
