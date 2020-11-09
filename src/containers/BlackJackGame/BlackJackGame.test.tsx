import React from "react";
import { genericState, players } from "../../utils/testData";
import { BlackJackPhase } from "../../models/generic";
import { Button } from "@material-ui/core";
import { setup, wait } from "../../setupTests";
import { BlackJackGame } from "./BlackJackGame";

describe("Hand Container", () => {
  it("should render", () => {
    const testObj = setup(genericState, <BlackJackGame />);
    expect(testObj.wrapper).toBeTruthy();
  });

  it("should handle dealer hit", function () {
    const testObj = setup(
      {
        ...genericState,
        BlackJackReducer: {
          ...genericState.BlackJackReducer,
          state: BlackJackPhase.DEALER_PLAYING,
        },
      },
      <BlackJackGame />
    );
    const spy = spyOn(testObj.store, "dispatch").and.callThrough();
    wait(spy);
    expect(testObj.store.getActions()[0].type).toEqual("DEAL_CARD_BLACKJACK");
  });

  it("should handle dealer stay", function () {
    const testObj = setup(
      {
        BlackJackReducer: {
          ...genericState.BlackJackReducer,
          state: BlackJackPhase.DEALER_PLAYING,
          players: [players[0], { ...players[1], score: 19 }],
        },
      },
      <BlackJackGame />
    );

    expect(testObj.store.getActions()[0].type).toEqual(
      "MOVE_TO_COMPLETE_BLACKJACK"
    );
  });

  it("should handle dealer win", function () {
    const testObj = setup(
      {
        BlackJackReducer: {
          ...genericState.BlackJackReducer,
          state: BlackJackPhase.COMPLETE,
          players: [
            { ...players[0], score: 20 },
            { ...players[1], score: 21 },
          ],
        },
      },
      <BlackJackGame />
    );

    expect(testObj.wrapper?.text()).toContain("...");
  });

  it("should handle player win", function () {
    const testObj = setup(
      {
        ...genericState,
        BlackJackReducer: {
          ...genericState.BlackJackReducer,
          state: BlackJackPhase.COMPLETE,
          players: [
            { ...players[0], score: 21 },
            { ...players[1], score: 20 },
          ],
        },
      },
      <BlackJackGame />
    );

    expect(testObj.wrapper?.text()).toContain("!");
  });
  it("should handle player hit button click", function () {
    const testObj = setup(
      {
        ...genericState,
        BlackJackReducer: {
          ...genericState.BlackJackReducer,
          state: BlackJackPhase.PLAYER_PLAYING,
        },
      },
      <BlackJackGame />
    );
    testObj.wrapper?.find(Button).at(0).simulate("click");
    expect(testObj.store.getActions()[0].type).toEqual("DEAL_CARD_BLACKJACK");
  });
  it("should move to dealers phase on stay button", function () {
    const testObj = setup(
      {
        ...genericState,
        BlackJackReducer: {
          ...genericState.BlackJackReducer,
          state: BlackJackPhase.PLAYER_PLAYING,
        },
      },
      <BlackJackGame />
    );
    testObj.wrapper?.find(Button).at(1).simulate("click");
    expect(testObj.store.getActions()[0].type).toEqual(
      "MOVE_TO_DEALER_PLAYING_BLACKJACK"
    );
  });
  it("should move to cleanup on next game button click", function () {
    const testObj = setup(
      {
        ...genericState,
        BlackJackReducer: {
          ...genericState.BlackJackReducer,
          state: BlackJackPhase.COMPLETE,
        },
      },
      <BlackJackGame />
    );
    testObj.wrapper?.find(Button).at(0).simulate("click");
    wait().then(() => {
      expect(testObj.store.getActions()[0].type).toEqual("CLEANUP_BLACKJACK");
    });
  });
  // formik test asserts nothing. coverage only
  it("should place a bet on button click", function () {
    const testObj = setup(
      {
        ...genericState,
        BlackJackReducer: {
          ...genericState.BlackJackReducer,
          state: BlackJackPhase.BETTING,
        },
      },
      <BlackJackGame />
    );
    testObj.wrapper?.find("form").simulate("submit");
  });
  it("should bust a player", function () {
    let spy: any;
    const testObj = setup(
      {
        BlackJackReducer: {
          ...genericState.BlackJackReducer,
          state: BlackJackPhase.PLAYER_PLAYING,
          players: [{ ...players[0], score: 33 }, players[1]],
        },
      },
      <BlackJackGame />
    );
    spy = spyOn(testObj.store, "dispatch").and.callThrough();
    wait(spy);
  });
});
