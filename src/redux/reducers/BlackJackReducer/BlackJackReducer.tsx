import { BlackJack, BlackJackPhase } from "../../../models/generic";
import produce from "immer";
import { BlackJackAction } from "../../actions/BlackJackActions/BlackJackActions";

export const defaultState: BlackJack = {
  userId: "",
  currentGame: 0,
  playerInfo: {
    currencyDifference: 0,
    currentBet: 0,
    currentGamesPlayed: 0,
    currentHandsLost: 0,
    currentHandsWon: 0,
    history: [],
    wallet: 0,
    startingWallet: 0,
    currentBlackjacks: 0,
  },
  phase: BlackJackPhase.BETTING,
  insurance: false,
  doubleDowned: false,
  name: "BlackJack",
  numberOfDecks: 0,
  players: [],
  deck: [],
};

const BlackJackReducer = produce(
  (state = defaultState, action: BlackJackAction) => {
    switch (action.type) {
      case "INIT_BLACKJACK":
        state.userId = action.payload.userId;
        state.deck = action.payload.deck;
        state.players = action.payload.players;
        state.playerInfo.wallet = action.payload.wallet;
        state.playerInfo.startingWallet = action.payload.wallet;
        state.numberOfDecks = action.payload.numberOfDecks;
        state.phase = BlackJackPhase.COMPLETE;
        break;
      case "CURRENT_GAME_NUMBER":
        state.currentGame = action.payload;
        break;
      case "LOAD_BLACKJACK_DATA":
        state.userId = action.payload.userId;
        break;
      case "PLACE_BET_BLACKJACK":
        state.phase = BlackJackPhase.DEALING;
        state.players[0].currentBet = action.payload.currentBet;
        state.players[0].wallet = action.payload.wallet;
        state.playerInfo.currentBet = action.payload.currentBet;
        state.playerInfo.wallet = action.payload.wallet;
        break;
      case "INSURE":
        state.insurance = true;
        state.players[0].wallet = action.payload.wallet;
        state.playerInfo.wallet = action.payload.wallet;
        break;
      case "SPLIT":
        state.players[0] = action.payload.player;
        state.deck = action.payload.deck;
        break;
      case "DEAL_OPENING_CARDS_BLACKJACK":
        state.deck = action.payload.deck;
        state.players[0].hand = action.payload.hand1;
        state.players[1].hand = action.payload.hand2;
        state.phase = BlackJackPhase.PLAYER_PLAYING;
        break;
      case "CALCULATE_SCORE_BLACKJACK":
        state.players[action.payload.playerId].score = action.payload.score;
        break;
      case "DEAL_CARD_BLACKJACK":
        state.deck = action.payload.deck;
        state.players[action.payload.playerId].hand = action.payload.hand;
        break;
      case "MOVE_TO_DEALER_PLAYING_BLACKJACK":
        state.phase = BlackJackPhase.DEALER_PLAYING;
        state.players[1].hand = action.payload;
        break;
      case "MOVE_TO_COMPLETE_BLACKJACK":
        state.phase = BlackJackPhase.COMPLETE;
        break;
      case "DOUBLE_DOWN":
        state.doubleDowned = true;
        state.players[0].currentBet = action.payload.currentBet;
        state.players[0].wallet = action.payload.wallet;
        state.playerInfo.currentBet = action.payload.currentBet;
        state.playerInfo.wallet = action.payload.wallet;
        break;
      case "CLEANUP_BLACKJACK":
        state.players[0].hand = [];
        state.players[1].hand = [];
        state.players[0].score = 0;
        state.players[1].score = 0;
        state.deck = action.payload.deck;
        state.players[0].wallet = action.payload.wallet;
        state.players[0].currentBet = 5;
        state.phase = BlackJackPhase.BETTING;
        state.insurance = false;
        state.playerInfo = action.payload.info;
        state.doubleDowned = false;
        break;
      case "CASH_OUT":
        state.phase = BlackJackPhase.CASHOUT;
        break;
      default:
        return state;
    }
  },
  defaultState
);

export default BlackJackReducer;
