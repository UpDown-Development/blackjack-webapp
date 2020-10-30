import BlackJackReducer, { defaultState } from "./blackJackReducer";
import {
  BlackJack,
  BlackJackState,
  Card,
  Player,
} from "../../../models/generic";

const players: Player[] = [
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

const card: Card = {
  name: "Test Name",
  img: "Test link",
  value: 9001,
  isFaceUp: true,
};

const deck: Card[] = [card, card, card, card];
const newDeck: Card[] = [card, card];

const genericState: BlackJack = {
  deck: deck,
  players: players,
  state: BlackJackState.BETTING,
  name: "BlackJack",
  numberOfDecks: 2,
};

const scoreState: BlackJack = {
  deck: deck,
  players: [
    {
      ...players[0],
      hand: newDeck,
    },
    {
      ...players[1],
      hand: newDeck,
    },
  ],
  state: BlackJackState.PLAYER_PLAYING,
  name: "BlackJack",
  numberOfDecks: 2,
};

describe("BlackJack Reducer", () => {
  it("should initialize a blackjack game", function () {
    const result = BlackJackReducer(defaultState, {
      type: "INIT_BLACKJACK",
      payload: {
        players: players,
        deck: deck,
      },
    });
    expect(result).toEqual({
      playerInfo: {},
      players: players,
      deck: deck,
      state: BlackJackState.BETTING,
      name: "BlackJack",
      numberOfDecks: 0,
    });
  });

  it("should place a bet", function () {
    const result = BlackJackReducer(genericState, {
      type: "PLACE_BET_BLACKJACK",
      payload: {
        currentBet: 5,
        wallet: 45,
      },
    });
    expect(result).toEqual({
      players: [
        {
          ...players[0],
          currentBet: 5,
          wallet: 45,
        },
        players[1],
      ],
      deck: deck,
      state: BlackJackState.DEALING,
      name: "BlackJack",
      numberOfDecks: 2,
    });
  });

  it("should deal opening cards", function () {
    const result = BlackJackReducer(genericState, {
      type: "DEAL_OPENING_CARDS_BLACKJACK",
      payload: {
        deck: newDeck,
        hand1: newDeck,
        hand2: newDeck,
      },
    });
    expect(result).toEqual({
      players: [
        {
          ...players[0],
          hand: newDeck,
        },
        {
          ...players[1],
          hand: newDeck,
        },
      ],
      deck: newDeck,
      state: BlackJackState.PLAYER_PLAYING,
      name: "BlackJack",
      numberOfDecks: 2,
    });
  });

  it("should calculate score", function () {
    const result = BlackJackReducer(scoreState, {
      type: "CALCULATE_SCORE_BLACKJACK",
      payload: {
        score: 21,
        playerId: 0,
      },
    });
    expect(result).toEqual({
      players: [
        {
          ...scoreState.players[0],
          score: 21,
        },
        scoreState.players[1],
      ],
      deck: deck,
      state: BlackJackState.PLAYER_PLAYING,
      name: "BlackJack",
      numberOfDecks: 2,
    });
  });

  it("should deal a card", function () {
    const result = BlackJackReducer(scoreState, {
      type: "DEAL_CARD_BLACKJACK",
      payload: {
        deck: newDeck,
        playerId: 0,
        hand: deck,
      },
    });
    expect(result).toEqual({
      players: [
        {
          ...scoreState.players[0],
          hand: deck,
        },
        scoreState.players[1],
      ],
      deck: newDeck,
      state: BlackJackState.PLAYER_PLAYING,
      name: "BlackJack",
      numberOfDecks: 2,
    });
  });

  it("should end the player's turn", function () {
    const result = BlackJackReducer(scoreState, {
      type: "MOVE_TO_DEALER_PLAYING_BLACKJACK",
      payload: newDeck,
    });
    expect(result.state === BlackJackState.DEALER_PLAYING);
    expect(result.players[1].hand === newDeck);
  });

  it("should end the game", function () {
    const result = BlackJackReducer(scoreState, {
      type: "MOVE_TO_COMPLETE_BLACKJACK",
      payload: { undefined },
    });
    expect(result.state === BlackJackState.COMPLETE);
  });

  it("should clean up after us", function () {
    const result = BlackJackReducer(scoreState, {
      type: "CLEANUP_BLACKJACK",
      payload: {
        deck: newDeck,
        wallet: 100,
      },
    });
    expect(result).toEqual({
      players: [
        {
          ...scoreState.players[0],
          wallet: 100,
          currentBet: 5,
        },
        scoreState.players[1],
      ],
      deck: newDeck,
      state: BlackJackState.BETTING,
      name: "BlackJack",
      numberOfDecks: 2,
    });
  });

  it("should do nothing", function () {
    const result = BlackJackReducer(genericState, {
      type: "BOOGIE_WOOGIE",
      payload: {},
    });
    expect(result === genericState);
  });
});
