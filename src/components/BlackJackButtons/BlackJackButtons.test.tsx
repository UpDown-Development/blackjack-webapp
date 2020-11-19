import { failTest, setup } from "../../setupTests";
import { genericState } from "../../utils/testData";
import React from "react";
import BlackJackButtons from "./BlackJackButtons";

describe("<BlackJackButtons/>", () => {
  it("renders without crashing", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <BlackJackButtons />);
      await expect(testObj).toBeTruthy();
    } catch (e) {
      failTest(e);
    }
  });
  it("hits", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <BlackJackButtons />);
      // @ts-ignore
      testObj.wrapper.find('[test-id="hit"]').find("button").props().onClick();
      await Promise.resolve().then(() => {
        expect(testObj.store.getActions()[0].type).toEqual(
          "DEAL_CARD_BLACKJACK"
        );
      });
    } catch (e) {
      failTest(e);
    }
  });
  it("should handle pressing the stay button", async () => {
    jest.mock("firebase");
    const testObj = setup(genericState, <BlackJackButtons />);
    // @ts-ignore
    testObj.wrapper?.find('[test-id="stay"]').find("button").props().onClick();
    await Promise.resolve().then(() => {
      expect(testObj.store.getActions()[0].type).toEqual(
        "MOVE_TO_DEALER_PLAYING_BLACKJACK"
      );
    });
  });
  it("should handle insurance", async () => {
    jest.mock("firebase");
    const testObj = setup(genericState, <BlackJackButtons />);
    // @ts-ignore
    testObj.wrapper
      ?.find('[test-id="insurance"]')
      .find("button")
      .props()
      // @ts-ignore
      .onClick();
    await Promise.resolve().then(() => {
      expect(testObj.store.getActions()[0].type).toEqual("INSURE");
    });
  });
  it("should handle double down", async () => {
    jest.mock("firebase");
    const testObj = setup(genericState, <BlackJackButtons />);
    // @ts-ignore
    testObj.wrapper
      ?.find('[test-id="doubleDown"]')
      .find("button")
      .props()
      // @ts-ignore
      .onClick();
    await Promise.resolve().then(() => {
      expect(testObj.store.getActions()[0].type).toEqual("DOUBLE_DOWN");
      expect(testObj.store.getActions()[1].type).toEqual("DEAL_CARD_BLACKJACK");
      expect(testObj.store.getActions()[2].type).toEqual(
        "MOVE_TO_DEALER_PLAYING_BLACKJACK"
      );
    });
  });
});
