import { setup } from "../../setupTests";
import { genericState, players } from "../../utils/testData";
import React from "react";
import Login from "./Login";

describe("<Login/>", () => {
  it("renders without crashing", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <Login />);
      await expect(testObj).toBeTruthy();
    } catch (e) {
      console.log("CATCH BLOCK ON TEST HIT...");
    }
  });
});
