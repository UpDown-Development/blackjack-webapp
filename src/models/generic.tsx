export interface Data {
  netWorth: number;
  totalCurrencyWon: number;
  handsWon: number;
  handsPlayer: number;
  gamesPlayed: number;
}

export interface Player {
  wallet: number;
  currentBet: number;
  hand: Card[];
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
  BETTING,
  DEALING,
  PLAYING,
  CLEANUP,
}

export interface BlackJack extends Game {
  deck: Card[];
  state: BlackJackState
}

export interface Card {
  name: string;
  img: string;
  value: number;
  secondaryValue?: number;
  isFaceUp: boolean;
}
