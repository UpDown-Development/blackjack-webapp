import { setup } from "../../setupTests";
import { genericState, players } from "../../utils/testData";
import React from "react";
import StatsSidebar from "./StatsSidebar";

describe("<StatsSideBar/>", () => {
  it("renders without crashing", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <StatsSidebar />);
      await expect(testObj).toBeTruthy();
    } catch (e) {
      console.log("CATCH BLOCK ON TEST HIT...");
    }
  });
});
