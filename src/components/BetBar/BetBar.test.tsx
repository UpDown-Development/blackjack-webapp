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
  it("should move to the next game", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <BetBar state={3} />);
      // @ts-ignore
      await act(async () => {
        await testObj.wrapper
          ?.find('[test-id="submitButton"]')
          .find("button")
          .simulate("submit");
      });
      expect(testObj.store.getActions()[0].type).toEqual("CLEANUP_BLACKJACK");
    } catch (e) {
      failTest();
    }
  });
});
