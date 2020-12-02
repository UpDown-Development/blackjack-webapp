import { failTest, setup } from "../../setupTests";
import { card, genericState, players } from "../../utils/testData";
import React from "react";
import Hand from "./Hand";

describe("<Hand/>", () => {
  it("renders without crashing", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(
        genericState,
        <Hand hand={[card, card]} player={players[0]} />
      );
      await expect(testObj).toBeTruthy();
    } catch (e) {
      failTest(e);
    }
  });
});
