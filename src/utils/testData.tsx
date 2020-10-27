import { BlackJack, BlackJackState, Card, Player } from "../models/generic";
import { deck } from "./blackJackDeck";

export const card: Card = {
  name: "Test Name",
  img: "Test link",
  value: 9001,
  isFaceUp: true,
};
export const hand: Card[] = [card, card];
export const players: Player[] = [
  {
    name: "player",
    wallet: 50,
    currentBet: 0,
    hand: [],
    score: 0,
  } as Player,
  {
    name: "dealer",
    wallet: 50,
    currentBet: 0,
    hand: [],
    score: 0,
  } as Player,
];
export const genericState: BlackJack = {
  deck: deck,
  players: players,
  state: BlackJackState.BETTING,
  name: "BlackJack",
  numberOfDecks: 2,
};
