import firebase from "firebase";
const User = require("firebase");

export interface Data {
  netWorth: number;
  totalCurrencyWon: number;
  handsWon: number;
  handsPlayer: number;
  gamesPlayed: number;
}

export enum CurrentGame {
  BLACKJACK = "BLACKJACK",
}

export interface Player {
  name: string;
  wallet: number;
  currentBet: number;
  hand: Card[];
  score?: number;
}

export interface GameUser {
  errorMessage: string;
  loading: boolean;
  user: typeof User | undefined;
  username: string;
  nickname: string;
  currentCardBackground: string;
  data: Data | undefined;
}

export interface Game {
  numberOfDecks: number;
  name: string;
  players: Player[];
  playerInfo: any;
  userId: string;
}

export enum BlackJackState {
  BETTING = "BETTING",
  DEALING = "DEALING",
  PLAYER_PLAYING = "PLAYER_PLAYING",
  DEALER_PLAYING = "DEALER_PLAYING",
  COMPLETE = "COMPLETE",
  CASHOUT = "CASHOUT",
}

export interface BlackJack extends Game {
  deck: Card[];
  state: BlackJackState;
}

export interface Card {
  name: string;
  img: string;
  value: number;
  secondaryValue?: number;
  isFaceUp: boolean;
}
