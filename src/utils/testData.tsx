import {
  BlackJack,
  BlackJackState,
  Card,
  GameUser,
  Player,
} from "../models/generic";
import { deck } from "./blackJackDeck";
import { RootState } from "../redux/rootReducer";

export const card: Card = {
  name: "Test Name",
  img: "Test link",
  value: 7,
  isFaceUp: true,
};
export const hand: Card[] = [card, card];
export const players: Player[] = [
  {
    name: "player",
    wallet: 50,
    currentBet: 20,
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

export const genericState: RootState = {
  UserReducer: {
    currentCardBackground: "",
    data: undefined,
    errorMessage: "",
    loading: false,
    nickname: "",
    user: {
      user: {
        user: {
          uid: "123",
        },
      },
    },
    username: "",
  },
  BlackJackReducer: {
    userId: "",
    playerInfo: {},
    deck: deck,
    players: players,
    state: BlackJackState.BETTING,
    name: "BlackJack",
    numberOfDecks: 2,
  },
};

export const loadedHand: Card[] = [
  {
    name: "Nine of Spades",
    img: "http://localhost:3000/imgs/cards/cards/9S.png",
    value: 9,
    isFaceUp: true,
  },
  {
    name: "Ace of Spades",
    img: "http://localhost:3000/imgs/cards/cards/AS.png",
    value: 11,
    isFaceUp: true,
    secondaryValue: 1,
  },
  {
    name: "Ace of Spades",
    img: "http://localhost:3000/imgs/cards/cards/AS.png",
    value: 11,
    isFaceUp: true,
    secondaryValue: 1,
  },
  {
    name: "Ten of Spades",
    img: "http://localhost:3000/imgs/cards/cards/10S.png",
    value: 10,
    isFaceUp: true,
  },
];

export const loadedDeck: Card[] = [
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
  ...loadedHand,
];
