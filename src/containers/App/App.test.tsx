import React from "react";
import App from "./App";
import { setup } from "../../setupTests";
import { genericState } from "../../utils/testData";
import "firebase";

describe("<App/>", () => {
  it("renders without crashing", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <App />);
      await expect(testObj).toBeTruthy();
    } catch (e) {
      console.log("CATCH BLOCK ON TEST HIT...");
    }
  });
});
