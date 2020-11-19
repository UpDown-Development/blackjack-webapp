import { failTest, setup } from "../../setupTests";
import { genericState, loadedDeck, players } from "../../utils/testData";
import React from "react";
import { BlackJackGame } from "./BlackJackGame";
import {
  checkScore,
  dealerAI,
  displayWinMessage,
} from "./blackJackGame.helper";
import { deck } from "../../utils/blackJackDeck";
import { Player } from "../../models/generic";

describe("<BlackJackGame/>", () => {
  it("renders without crashing", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <BlackJackGame />);
      await expect(testObj).toBeTruthy();
    } catch (e) {
      failTest(e);
    }
  });
  it("performs dealerAI successfully", () => {
    const dispatch = jest.fn();
    let result = dealerAI(dispatch, deck, players[0]);
    expect(dispatch).toHaveBeenCalled();
    expect(result).toBeTruthy();
    result = dealerAI(dispatch, deck, { ...players[0], score: 18 });
    expect(result).toBeFalsy();
    expect(dispatch).toHaveBeenCalled();
  });
  it("should display the correct game over message", function () {
    const ace = loadedDeck[0];
    const ten = loadedDeck[1];
    const blackJack: Player = {
      currentBet: 0,
      hand: [ace, ten],
      name: "",
      wallet: 0,
      score: 21,
    };
    const bust: Player = {
      currentBet: 0,
      hand: [],
      name: "",
      wallet: 0,
      score: 23,
    };
    const loser: Player = {
      currentBet: 0,
      hand: [],
      name: "",
      wallet: 0,
      score: 17,
    };
    const winner: Player = {
      currentBet: 0,
      hand: [ace, ten],
      name: "",
      wallet: 0,
      score: 20,
    };
    const dispatch = jest.fn();
    let result = displayWinMessage(dispatch, players[0], players[1]);
    expect(result.state).toEqual(0);
    result = displayWinMessage(dispatch, winner, loser);
    expect(result.state).toEqual(1);
    result = displayWinMessage(dispatch, loser, winner);
    expect(result.state).toEqual(-1);
    result = displayWinMessage(dispatch, winner, bust);
    expect(result.state).toEqual(1);
    result = displayWinMessage(dispatch, bust, winner);
    expect(result.state).toEqual(-1);
    result = displayWinMessage(dispatch, blackJack, winner);
    expect(result.state).toEqual(1.5);
  });
  it("should dispatch check score", function () {
    const dispatch = jest.fn();
    checkScore(dispatch, { ...players[0], score: 23 }, players[1]);
    expect(dispatch).toHaveBeenCalled();
  });
});
