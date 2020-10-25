import { BlackJack } from "../../models/generic";

interface BlackJackAction {
  type: string;
  payload: BlackJack;
}

const defaultState: BlackJack = {
  name: "",
  numberOfDecks: 0,
  players: [],
  deck: [],
};

const BlackJackReducer = (state = defaultState, action: BlackJackAction) => {
  switch (action.type) {
    case "INIT_BLACKJACK":
      return {
        ...state,
        deck: action.payload.deck,
      };
    default:
      return state;
  }
};

export default BlackJackReducer;
