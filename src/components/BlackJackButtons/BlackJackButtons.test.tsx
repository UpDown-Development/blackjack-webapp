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
      testObj.wrapper?.find('[test-id="hit"]').find("button").props().onClick();
      await Promise.resolve().then(() => {
        expect(testObj.store.getActions()[0].type).toEqual(
          "DEAL_CARD_BLACKJACK"
        );
      });
    } catch (e) {
      failTest(e);
    }
  });
});
