import firebase from "firebase";
import User = firebase.User;

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
}

export interface GameUser {
  loading: boolean;
  user: User;
  username: string;
  nickname: string;
  currentCardBackground: string;
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
  PLAYER_PLAYING = "PLAYER_PLAYING",
  DEALER_PLAYING = "DEALER_PLAYING",
  COMPLETE = "COMPLETE",
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
