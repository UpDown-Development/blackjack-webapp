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
    playerInfo: {},
    deck: deck,
    players: players,
    state: BlackJackState.BETTING,
    name: "BlackJack",
    numberOfDecks: 2,
  },
};
