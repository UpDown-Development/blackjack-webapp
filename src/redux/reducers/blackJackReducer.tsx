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
          state.state = BlackJackState.DEALING
          break;
        case "MOVE_TO_DEALER_PLAYING_BLACKJACK":
          state.state = BlackJackState.DEALER_PLAYING
          break;
        case "DEAL_CARD_BLACKJACK":
          let playerNum: number

          if (action.payload.player === 'Dealer') {
            playerNum = 1
          } else {
            playerNum = 0
          }
          state.deck = action.payload.deck;
          state.players[playerNum].hand = action.payload.hand
          break;
        case "DEAL_OPENING_CARDS_BLACKJACK":
          state.deck = action.payload.deck;
          state.players[0].hand = action.payload.hand1
          state.players[1].hand = action.payload.hand2
          state.state = BlackJackState.PLAYING
          break;
        default:
          return state;
      }
    },
    defaultState
);

export default BlackJackReducer;
