import { failTest, setup } from "../../setupTests";
import { genericState, players } from "../../utils/testData";
import React from "react";
import { BlackJackGame } from "./BlackJackGame";

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
});
