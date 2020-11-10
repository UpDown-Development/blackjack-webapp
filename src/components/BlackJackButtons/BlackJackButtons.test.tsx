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
});
