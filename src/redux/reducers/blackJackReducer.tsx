import { BlackJack } from "../../models/generic";

const defaultState: BlackJack = {
  name: "",
  numberOfDecks: 0,
  players: [],
  deck: [],
};

const BlackJackReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case "INIT_BLACKJACK":
      return {
        ...state,
        name: "BlackJack",
        numberOfDecks: action.payload.numberOfDecks,
        players: action.payload.players,
        deck: action.playload.deck,
      };
    default:
      return state;
  }
};

export default BlackJackReducer;
