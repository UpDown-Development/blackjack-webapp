import { BlackJack, BlackJackPhase, Card, Player } from "../models/generic";
import { deck } from "./blackJackDeck";
import { RootState } from "../redux/rootReducer";

export const card: Card = {
  delay: 0.6000000000000001,
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
        uid: 123,
        user: {
          uid: "123",
        },
      },
    },
    username: "",
  },
  BlackJackReducer: {
    userId: "123",
    currentGame: 123,
    playerInfo: {
      currentHandsLost: 12,
      currentHandsWon: 5,
      startingWallet: 50,
      history: [],
    },
    deck: deck,
    players: players,
    state: BlackJackPhase.BETTING,
    name: "BlackJack",
    numberOfDecks: 2,
  },
};

const loadedHand: Card[] = [
  {
    delay: 0.6000000000000001,
    name: "Nine of Spades",
    img: "http://localhost:3000/imgs/cards/cards/9S.png",
    value: 9,
    isFaceUp: true,
  },
  {
    delay: 0.6000000000000001,
    name: "Ace of Spades",
    img: "http://localhost:3000/imgs/cards/cards/AS.png",
    value: 11,
    isFaceUp: true,
    secondaryValue: 1,
  },
  {
    delay: 0.6000000000000001,
    name: "Ace of Spades",
    img: "http://localhost:3000/imgs/cards/cards/AS.png",
    value: 11,
    isFaceUp: true,
    secondaryValue: 1,
  },
  {
    delay: 0.6000000000000001,
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

const insuranceHand: Card[] = [
  {
    name: "Ten of Spades",
    img: "http://localhost:3000/imgs/cards/cards/10S.png",
    value: 10,
    isFaceUp: true,
    secondaryValue: 1,
  },
  {
    name: "Ten of Spades",
    img: "http://localhost:3000/imgs/cards/cards/10S.png",
    value: 10,
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
    name: "Nine of Spades",
    img: "http://localhost:3000/imgs/cards/cards/9S.png",
    value: 9,
    isFaceUp: true,
  },
];

export const insuranceDeck: Card[] = [
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
  ...insuranceHand,
];
