const User = require("firebase");

export enum CurrentGame {
  BLACKJACK = "BLACKJACK",
}

export interface Player {
  name: string;
  wallet: number;
  currentBet: number;
  hand: Card[];
  secondHand: Card[];
  score?: number;
}

export interface GameUser {
  errorMessage: string;
  loading: boolean;
  user: typeof User | undefined;
  username: string;
  nickname: string;
  currentCardBackground: string;
  netWorth: number;
}

export interface HandHistory {
  result: number;
  playerHand: Card[];
  dealerHand: Card[];
}

export interface PlayerInfo {
  currencyDifference: number;
  currentHandsWon: number;
  currentHandsLost: number;
  currentGamesPlayed: number;
  currentBlackjacks?: number;
  currentBet: number;
  startingWallet: number;
  wallet: number;
  history: HandHistory[];
}

export interface Game {
  currentGame: number;
  numberOfDecks: number;
  name: string;
  players: Player[];
  playerInfo: PlayerInfo;
  userId: string;
}

export enum BlackJackPhase {
  BETTING = "BETTING",
  DEALING = "DEALING",
  PLAYER_PLAYING = "PLAYER_PLAYING",
  DEALER_PLAYING = "DEALER_PLAYING",
  COMPLETE = "COMPLETE",
  CASHOUT = "CASHOUT",
}

export interface BlackJack extends Game {
  deck: Card[];
  phase: BlackJackPhase;
  insurance: boolean;
  doubleDowned: boolean;
}

export interface Card {
  name: string;
  img: string;
  value: number;
  secondaryValue?: number;
  isFaceUp: boolean;
  delay?: number;
}

export enum ColorEnum {
  WIN = "success",
  PUSH = "info",
  LOSS = "error",
}
