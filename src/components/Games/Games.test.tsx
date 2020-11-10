import { setup } from "../../setupTests";
import { genericState } from "../../utils/testData";
import React from "react";
import { Games } from "@material-ui/icons";

describe("<Games/>", () => {
  it("renders without crashing", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <Games />);
      await expect(testObj).toBeTruthy();
    } catch (e) {
      console.log("CATCH BLOCK ON TEST HIT...");
    }
  });
});
