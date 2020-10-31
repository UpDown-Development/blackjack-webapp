import { genericState, hand, players } from "../../../utils/testData";
import {
  cleanUp,
  dealCard,
  dealOpeningCards,
  endPlaying,
  initBlackJack,
  moveToComplete,
  placeBet,
} from "./blackJackActions";
import { deck } from "../../../utils/blackJackDeck";
import { BlackJackState } from "../../../models/generic";
import { setup, wait } from "../../../setupTests";
import { db } from "../../../utils/firebaseConfig";

describe("Blackjack Actions Tests", () => {
  xit("should create and setup a game", function () {
    jest.mock("firebase");
    const testObj = setup(genericState);
    const spy = spyOn(
      db
        .collection("users")
        .doc("1")
        .collection("BLACKJACK")
        .doc("BLACKJACKInfo"),
      "get"
    ).and.returnValue(() => {
      user: {
      }
    });
    return (
      testObj.store
        // @ts-ignore
        .dispatch(initBlackJack("1", 1, 200))
        .then(() => {
          wait(spy);
          expect(testObj.store.getActions()[0].type).toEqual("INIT_BLACKJACK");
        })
    );
    jest.resetAllMocks();
  });
  it("should place a bet", function () {
    const testObj = setup(genericState);

    // @ts-ignore
    return testObj.store.dispatch(placeBet(200, 500)).then(() => {
      expect(testObj.store.getActions()[0].type).toEqual("PLACE_BET_BLACKJACK");
      expect(testObj.store.getActions()[0].payload).toEqual({
        currentBet: 200,
        wallet: 300,
      });
    });
  });
  it("should move to dealers phase", function () {
    const testObj = setup(genericState);

    // @ts-ignore
    return testObj.store.dispatch(endPlaying(hand, players[1])).then(() => {
      expect(testObj.store.getActions()[0].type).toEqual(
        "MOVE_TO_DEALER_PLAYING_BLACKJACK"
      );
      expect(testObj.store.getActions()[1].type).toEqual(
        "CALCULATE_SCORE_BLACKJACK"
      );
    });
  });
  it("should cleanup correctly after push", function () {
    const testObj = setup(genericState);

    return (
      testObj.store
        // @ts-ignore
        .dispatch(cleanUp(0, genericState.BlackJackReducer))
        .then(() => {
          expect(testObj.store.getActions()[0].payload.wallet).toEqual(70);
        })
    );
  });
  it("should cleanup correctly after win", function () {
    const testObj = setup(genericState);

    return (
      testObj.store
        // @ts-ignore
        .dispatch(cleanUp(1, genericState.BlackJackReducer))
        .then(() => {
          expect(testObj.store.getActions()[0].payload.wallet).toEqual(90);
        })
    );
  });
  it("should change phases", function () {
    const testObj = setup(genericState);

    // @ts-ignore
    return testObj.store.dispatch(moveToComplete(1)).then(() => {
      expect(testObj.store.getActions()[0].type).toEqual(
        "MOVE_TO_COMPLETE_BLACKJACK"
      );
    });
  });
  it("should deal opening cards", function () {
    const testObj = setup(genericState);

    // @ts-ignore
    return testObj.store.dispatch(dealOpeningCards(deck, players)).then(() => {
      expect(testObj.store.getActions()[0].type).toEqual(
        "DEAL_OPENING_CARDS_BLACKJACK"
      );
      expect(testObj.store.getActions()[0].payload.hand1[0]).toEqual(deck[51]);
      expect(testObj.store.getActions()[0].payload.deck.length).toEqual(48);
    });
  });
  it("should deal a card", function () {
    const testObj = setup(genericState);
    // @ts-ignore
    return testObj.store.dispatch(dealCard(deck, players[0])).then(() => {
      expect(testObj.store.getActions()[0].type).toEqual("DEAL_CARD_BLACKJACK");
      expect(testObj.store.getActions()[0].payload.hand.length).toEqual(1);
      expect(testObj.store.getActions()[0].payload.deck.length).toEqual(51);
    });
  });
  it("should cleanup correctly after loss", function () {
    const testObj = setup(genericState);

    return (
      testObj.store
        // @ts-ignore
        .dispatch(cleanUp(-1, genericState.BlackJackReducer))
        .then(() => {
          expect(testObj.store.getActions()[0].payload.wallet).toEqual(50);
        })
    );
  });
  it("should shuffle a low deck", function () {
    const testObj = setup({ ...genericState, deck: hand });

    return testObj.store
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
        expect(testObj.store.getActions()[0].payload.deck.length).toEqual(104);
      });
  });
});
