import { BlackJack } from "../../models/generic";
import produce from "immer";
import {BlackJackAction} from "../actions/blackJackActions";

const defaultState: BlackJack = {
  name: "",
  numberOfDecks: 0,
  players: [],
  deck: [],
};

const BlackJackReducer = produce((state = defaultState, action: BlackJackAction) => {
  switch (action.type) {
    case "INIT_BLACKJACK":
      state.deck = action.payload.deck
      break;
    default:
      return state;
  }
}, defaultState);

export default BlackJackReducer;
