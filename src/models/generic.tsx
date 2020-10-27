export interface Data {
  netWorth: number;
  totalCurrencyWon: number;
  handsWon: number;
  handsPlayer: number;
  gamesPlayed: number;
}

export interface Player {
  name: string;
  wallet: number;
  currentBet: number;
  hand: Card[];
  score?: number;
  isTurn: boolean;
}

export interface User {
  username: string;
  nickname: string;
  currentBackground: string;
  data: Data;
}

export interface Game {
  numberOfDecks: number;
  name: string;
  players: Player[];
}

export enum BlackJackState {
  BETTING = "BETTING",
  DEALING = "DEALING",
  PLAYING = "PLAYING",
  DEALER_PLAYING = "DEALER_PLAYING",
  CLEANUP = "CLEANUP",
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
