import thunk from "redux-thunk";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { genericState, hand, players } from "../../utils/testData";
import {
  cleanUp,
  dealCard,
  dealOpeningCards,
  endPlaying,
  initBlackJack,
  moveToComplete,
  placeBet,
} from "./blackJackActions";
import { deck } from "../../utils/blackJackDeck";
import { BlackJackState } from "../../models/generic";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Blackjack Actions Tests", () => {
  let store: MockStoreEnhanced<unknown, {}>;
  const setup = (data: any) => {
    store = mockStore({
      ...data,
    });
  };
  it("should create and setup a game", function () {
    setup(genericState);

    // @ts-ignore
    return store.dispatch(initBlackJack(1)).then(() => {
      expect(store.getActions()[0].payload.deck.length).toEqual(52);
      expect(store.getActions()[0].payload.deck).not.toEqual(deck);
    });
  });
  it("should place a bet", function () {
    setup(genericState);

    // @ts-ignore
    return store.dispatch(placeBet(200, 500)).then(() => {
      expect(store.getActions()[0].type).toEqual("PLACE_BET_BLACKJACK");
      expect(store.getActions()[0].payload).toEqual({
        currentBet: 200,
        wallet: 300,
      });
    });
  });
  it("should move to dealers phase", function () {
    setup(genericState);

    // @ts-ignore
    return store.dispatch(endPlaying(hand, players[1])).then(() => {
      expect(store.getActions()[0].type).toEqual(
        "MOVE_TO_DEALER_PLAYING_BLACKJACK"
      );
      expect(store.getActions()[1].type).toEqual("CALCULATE_SCORE_BLACKJACK");
    });
  });
  it("should cleanup correctly after push", function () {
    setup(genericState);

    // @ts-ignore
    return store.dispatch(cleanUp(0, genericState)).then(() => {
      expect(store.getActions()[0].payload.wallet).toEqual(70);
    });
  });
  it("should cleanup correctly after win", function () {
    setup(genericState);

    // @ts-ignore
    return store.dispatch(cleanUp(1, genericState)).then(() => {
      expect(store.getActions()[0].payload.wallet).toEqual(90);
    });
  });
  it("should change phases", function () {
    setup(genericState);

    // @ts-ignore
    return store.dispatch(moveToComplete(1)).then(() => {
      expect(store.getActions()[0].type).toEqual("MOVE_TO_COMPLETE_BLACKJACK");
    });
  });
  it("should deal opening cards", function () {
    setup(genericState);

    // @ts-ignore
    return store.dispatch(dealOpeningCards(deck, players)).then(() => {
      expect(store.getActions()[0].type).toEqual(
        "DEAL_OPENING_CARDS_BLACKJACK"
      );
      expect(store.getActions()[0].payload.hand1[0]).toEqual(deck[51]);
      expect(store.getActions()[0].payload.deck.length).toEqual(48);
    });
  });
  it("should deal a card", function () {
    setup(genericState);
    // @ts-ignore
    return store.dispatch(dealCard(deck, players[0])).then(() => {
      expect(store.getActions()[0].type).toEqual("DEAL_CARD_BLACKJACK");
      expect(store.getActions()[0].payload.hand.length).toEqual(1);
      expect(store.getActions()[0].payload.deck.length).toEqual(51);
    });
  });
  it("should cleanup correctly after loss", function () {
    setup(genericState);

    // @ts-ignore
    return store.dispatch(cleanUp(-1, genericState)).then(() => {
      expect(store.getActions()[0].payload.wallet).toEqual(50);
    });
  });
  it("should shuffle a low deck", function () {
    setup({ ...genericState, deck: hand });

    return store
      .dispatch(
        // @ts-ignore
        cleanUp(-1, {
          deck: hand,
          players: players,
          state: BlackJackState.BETTING,
          name: "BlackJack",
          numberOfDecks: 2,
        })
      )
      .then(() => {
        expect(store.getActions()[0].payload.deck.length).toEqual(104);
      });
  });
});
