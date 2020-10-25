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

export interface BlackJack extends Game {
  deck: Card[];
}

export interface Card {
  name: string;
  img: string;
  value: number;
  secondaryValue?: number;
}
