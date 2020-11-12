import { failTest, setup } from "../../setupTests";
import { genericState } from "../../utils/testData";
import React from "react";
import BetBar from "./BetBar";
import { act } from "react-dom/test-utils";

describe("<BetBar/>", () => {
  it("renders without crashing", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <BetBar state={3} />);
      await expect(testObj).toBeTruthy();
    } catch (e) {
      failTest(e);
    }
  });
});
