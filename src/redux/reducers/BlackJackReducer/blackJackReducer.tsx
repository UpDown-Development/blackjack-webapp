import { BlackJack, BlackJackState } from "../../../models/generic";
import produce from "immer";
import { BlackJackAction } from "../../actions/BlackJackActions/blackJackActions";

export const defaultState: BlackJack = {
  userId: "",
  playerInfo: {
    currencyDifference: 0,
    currentBet: 0,
    currentGamesPlayed: 0,
    currentHandsLost: 0,
    currentHandsWon: 0,
    history: [],
    wallet: 0,
    currentBlackjacks: 0,
  },
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
        state.playerInfo.wallet = action.payload.wallet;
        state.numberOfDecks = action.payload.numberOfDecks;
        state.state = BlackJackState.BETTING;
        break;
      case "LOAD_BLACKJACK_DATA":
        state.playerInfo = action.payload.data;
        state.userId = action.payload.userId;
        break;
      case "PLACE_BET_BLACKJACK":
        state.players[0].currentBet = action.payload.currentBet;
        state.players[0].wallet = action.payload.wallet;
        state.state = BlackJackState.DEALING;
        break;
      case "DEAL_OPENING_CARDS_BLACKJACK":
        state.deck = action.payload.deck;
        state.players[0].hand = action.payload.hand1;
        state.players[1].hand = action.payload.hand2;
        state.state = BlackJackState.PLAYER_PLAYING;
        break;
      case "CALCULATE_SCORE_BLACKJACK":
        state.players[action.payload.playerId].score = action.payload.score;
        break;
      case "DEAL_CARD_BLACKJACK":
        state.deck = action.payload.deck;
        state.players[action.payload.playerId].hand = action.payload.hand;
        break;
      case "MOVE_TO_DEALER_PLAYING_BLACKJACK":
        state.state = BlackJackState.DEALER_PLAYING;
        state.players[1].hand = action.payload;
        break;
      case "MOVE_TO_COMPLETE_BLACKJACK":
        state.state = BlackJackState.COMPLETE;
        break;
      case "CLEANUP_BLACKJACK":
        state.deck = action.payload.deck;
        state.players[0].wallet = action.payload.wallet;
        state.players[0].currentBet = 5;
        state.state = BlackJackState.BETTING;
        break;
      case "CASH_OUT":
        state.state = BlackJackState.CASHOUT;
        break;
      default:
        return state;
    }
  },
  defaultState
);

export default BlackJackReducer;
