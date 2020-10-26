import {BlackJack, BlackJackState} from "../../models/generic";
import produce from "immer";
import {BlackJackAction} from "../actions/blackJackActions";

const defaultState: BlackJack = {
  state: BlackJackState.BETTING,
  name: "BlackJack",
  numberOfDecks: 0,
  players: [],
  deck: [],
};

const BlackJackReducer = produce(
  (state = defaultState, action: BlackJackAction) => {
    switch (action.type) {
      case "INIT_BLACKJACK":
        state.deck = action.payload.deck;
        state.players = action.payload.players;
        break;
      case "PLACE_BET_BLACKJACK":
        state.players[0].currentBet = action.payload.currentBet;
        state.players[0].wallet = action.payload.wallet;
        break;
      default:
        return state;
    }
  },
  defaultState
);

export default BlackJackReducer;
