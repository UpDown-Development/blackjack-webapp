import React from "react";
import App from "./App";
import { failTest, setup } from "../../setupTests";
import { genericState } from "../../utils/testData";
import "firebase";

describe("<App/>", () => {
  it("renders without crashing", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <App />);
      await expect(testObj).toBeTruthy();
    } catch (e) {
      failTest(e);
    }
  });
});
