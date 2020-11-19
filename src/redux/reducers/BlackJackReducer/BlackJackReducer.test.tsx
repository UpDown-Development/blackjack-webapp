import {
  card,
  genericState,
  hand,
  loadedDeck,
  players,
} from "../../../utils/testData";
import BlackJackReducer, { defaultState } from "./BlackJackReducer";
import { BlackJackPhase, Player } from "../../../models/generic";

describe("BlackJack Reducer", () => {
  it("inits blackjack game", async () => {
    const result = BlackJackReducer(defaultState, {
      type: "INIT_BLACKJACK",
      payload: {
        deck: loadedDeck,
        players: players,
        wallet: 1234,
        numberOfDecks: 3,
      },
    });

    expect(result).toEqual({
      ...defaultState,
      userId: undefined,
      deck: loadedDeck,
      players: players,
      numberOfDecks: 3,
      phase: BlackJackPhase.COMPLETE,
      playerInfo: {
        ...defaultState.playerInfo,
        wallet: 1234,
        startingWallet: 1234,
      },
    });
  });
  it("inits loads current game number", async () => {
    const result = BlackJackReducer(defaultState, {
      type: "CURRENT_GAME_NUMBER",
      payload: 6,
    });

    expect(result.currentGame).toEqual(6);
  });
  it("loads blackjack player data", async () => {
    const result = BlackJackReducer(defaultState, {
      type: "LOAD_BLACKJACK_DATA",
      payload: {
        userId: 6,
      },
    });

    expect(result.userId).toEqual(6);
  });
  it("places a bet", async () => {
    const result = BlackJackReducer(genericState.BlackJackReducer, {
      type: "PLACE_BET_BLACKJACK",
      payload: {
        currentBet: 12,
        wallet: 4,
      },
    });

    expect(result.players[0].wallet).toEqual(4);
    expect(result.players[0].currentBet).toEqual(12);
    expect(result.playerInfo.wallet).toEqual(4);
    expect(result.playerInfo.currentBet).toEqual(12);
  });
  it("insures a hand", async () => {
    const result = BlackJackReducer(genericState.BlackJackReducer, {
      type: "INSURE",
      payload: {
        wallet: 1234,
      },
    });

    expect(result.insurance).toEqual(true);
  });
  it("should deal opening cards", async () => {
    const result = BlackJackReducer(genericState.BlackJackReducer, {
      type: "DEAL_OPENING_CARDS_BLACKJACK",
      payload: {
        deck: loadedDeck,
        hand1: [card, card],
        hand2: [card, card],
      },
    });

    expect(result.phase).toEqual(BlackJackPhase.PLAYER_PLAYING);
    expect(result.deck).toEqual(loadedDeck);
    expect(result.players[0].hand).toEqual([card, card]);
  });
  it("calculates a score", async () => {
    const result = BlackJackReducer(genericState.BlackJackReducer, {
      type: "CALCULATE_SCORE_BLACKJACK",
      payload: {
        playerId: 0,
        score: 1234,
      },
    });

    expect(result.players[0].score).toEqual(1234);
  });
  it("deals a card", async () => {
    const result = BlackJackReducer(genericState.BlackJackReducer, {
      type: "DEAL_CARD_BLACKJACK",
      payload: {
        deck: loadedDeck,
        playerId: 0,
        hand: [card, card, card],
      },
    });

    expect(result.players[0].hand).toEqual([card, card, card]);
    expect(result.deck).toEqual(loadedDeck);
  });
  it("moces to dealer playing", async () => {
    const result = BlackJackReducer(genericState.BlackJackReducer, {
      type: "MOVE_TO_DEALER_PLAYING_BLACKJACK",
      payload: hand,
    });

    expect(result.phase).toEqual(BlackJackPhase.DEALER_PLAYING);
    expect(result.players[1].hand).toEqual(hand);
  });
  it("completes a game", async () => {
    const result = BlackJackReducer(genericState.BlackJackReducer, {
      type: "MOVE_TO_COMPLETE_BLACKJACK",
    });

    expect(result.phase).toEqual(BlackJackPhase.COMPLETE);
  });
  it("cashs outs", async () => {
    const result = BlackJackReducer(genericState.BlackJackReducer, {
      type: "CASH_OUT",
    });
    expect(result.phase).toEqual(BlackJackPhase.CASHOUT);
  });
  it("cleans up a game", async () => {
    const result = BlackJackReducer(genericState.BlackJackReducer, {
      type: "CLEANUP_BLACKJACK",
      payload: {
        deck: loadedDeck,
        wallet: 1234,
        info: genericState.BlackJackReducer.playerInfo,
      },
    });
    expect(result.phase).toEqual(BlackJackPhase.BETTING);
    expect(result.insurance).toEqual(false);
    expect(result.deck).toEqual(loadedDeck);
    expect(result.playerInfo).toEqual(genericState.BlackJackReducer.playerInfo);
    result.players.forEach((player: Player) => {
      expect(player.score).toEqual(0);
      expect(player.hand).toEqual([]);
    });
  });
  it("should do nothing", async () => {
    const result = BlackJackReducer(defaultState, {
      type: "NO_NOTHING",
    });

    expect(result).toEqual(defaultState);
  });
});
