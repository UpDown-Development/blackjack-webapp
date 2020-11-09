import BlackJackReducer, { defaultState } from "./blackJackReducer";
import {
  BlackJack,
  BlackJackPhase,
  Card,
  HandHistory,
  Player,
  PlayerInfo,
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
  currentGame: 0,
  insurance: false,
  userId: "",
  playerInfo: {
    currencyDifference: 0,
    currentHandsWon: 0,
    currentHandsLost: 0,
    currentGamesPlayed: 0,
    currentBlackjacks: 0,
    currentBet: 0,
    startingWallet: 0,
    wallet: 0,
    history: [],
  },
  deck: deck,
  players: players,
  phase: BlackJackPhase.BETTING,
  name: "BlackJack",
  numberOfDecks: 2,
};

const scoreState: BlackJack = {
  currentGame: 0,
  insurance: false,
  userId: "",
  playerInfo: {} as PlayerInfo,
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
  phase: BlackJackPhase.PLAYER_PLAYING,
  name: "BlackJack",
  numberOfDecks: 2,
};

xdescribe("BlackJack Reducer", () => {
  it("should initialize a blackjack game", function () {
    const result = BlackJackReducer(defaultState, {
      type: "INIT_BLACKJACK",
      payload: {
        players: players,
        deck: deck,
        numberOfDecks: 3,
      },
    });
    expect(result).toEqual({
      currentGame: 0,
      deck: [
        {
          img: "Test link",
          isFaceUp: true,
          name: "Test Name",
          value: 9001,
        },
        {
          img: "Test link",
          isFaceUp: true,
          name: "Test Name",
          value: 9001,
        },
        {
          img: "Test link",
          isFaceUp: true,
          name: "Test Name",
          value: 9001,
        },
        {
          img: "Test link",
          isFaceUp: true,
          name: "Test Name",
          value: 9001,
        },
      ],
      insurance: false,
      name: "BlackJack",
      numberOfDecks: 3,
      playerInfo: {
        currencyDifference: 0,
        currentBet: 0,
        currentBlackjacks: 0,
        currentGamesPlayed: 0,
        currentHandsLost: 0,
        currentHandsWon: 0,
        history: [],
        startingWallet: undefined,
        wallet: undefined,
      },
      players: [
        {
          currentBet: 0,
          hand: [],
          name: "player",
          score: 0,
          wallet: 50,
        },
        {
          currentBet: 0,
          hand: [],
          name: "dealer",
          score: 0,
          wallet: 50,
        },
      ],
      phase: "COMPLETE",
      userId: "",
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
      currentGame: 0,
      playerInfo: {
        currentBet: 5,
        wallet: 45,
      },
      userId: "",
      players: [
        {
          ...players[0],
          currentBet: 5,
          wallet: 45,
        },
        players[1],
      ],
      deck: deck,
      phase: BlackJackPhase.DEALING,
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
      playerInfo: {},
      userId: "",
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
      phase: BlackJackPhase.PLAYER_PLAYING,
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
      playerInfo: {},
      userId: "",
      players: [
        {
          ...scoreState.players[0],
          score: 21,
        },
        scoreState.players[1],
      ],
      deck: deck,
      phase: BlackJackPhase.PLAYER_PLAYING,
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
      playerInfo: {},
      userId: "",
      players: [
        {
          ...scoreState.players[0],
          hand: deck,
        },
        scoreState.players[1],
      ],
      deck: newDeck,
      phase: BlackJackPhase.PLAYER_PLAYING,
      name: "BlackJack",
      numberOfDecks: 2,
    });
  });

  it("should end the player's turn", function () {
    const result = BlackJackReducer(scoreState, {
      type: "MOVE_TO_DEALER_PLAYING_BLACKJACK",
      payload: newDeck,
    });
    expect(result.phase === BlackJackPhase.DEALER_PLAYING);
    expect(result.players[1].hand === newDeck);
  });

  it("should end the game", function () {
    const result = BlackJackReducer(scoreState, {
      type: "MOVE_TO_COMPLETE_BLACKJACK",
      payload: { undefined },
    });
    expect(result.phase === BlackJackPhase.COMPLETE);
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
      playerInfo: undefined,
      userId: "",
      players: [
        {
          ...scoreState.players[0],
          wallet: 100,
          currentBet: 5,
          hand: [],
        },
        {
          ...scoreState.players[1],
          hand: [],
        },
      ],
      deck: newDeck,
      phase: BlackJackPhase.BETTING,
      insurance: false,
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
