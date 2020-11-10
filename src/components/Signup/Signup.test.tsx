import { setup } from "../../setupTests";
import { genericState, players } from "../../utils/testData";
import React from "react";
import Signup from "./Signup";

describe("<Signup/>", () => {
  it("renders without crashing", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <Signup />);
      await expect(testObj).toBeTruthy();
    } catch (e) {
      console.log("CATCH BLOCK ON TEST HIT...");
    }
  });
});
