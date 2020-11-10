import { failTest, setup } from "../../setupTests";
import { genericState, players } from "../../utils/testData";
import React from "react";
import SetupGame from "./SetupGame";

describe("<SetupGame/>", () => {
  it("renders without crashing", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <SetupGame />);
      await expect(testObj).toBeTruthy();
    } catch (e) {
      failTest(e);
    }
  });
});
