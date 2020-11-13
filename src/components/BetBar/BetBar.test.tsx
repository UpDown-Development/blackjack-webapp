import { failTest, setup } from "../../setupTests";
import { genericState } from "../../utils/testData";
import React from "react";
import BetBar from "./BetBar";
import Signup from "../Signup/Signup";
import { act } from "react-dom/test-utils";
import { BlackJackPhase } from "../../models/generic";

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
  it("should handle cashout", async () => {
    jest.mock("firebase");
    const testObj = setup(genericState, <BetBar state={4} />);
    await act(async () => {
      // @ts-ignore
      await testObj.wrapper
        ?.find('[test-id="cashoutBtn"]')
        .find("button")
        .props()
        // @ts-ignore
        .onClick();
    });
    await Promise.resolve().then(() => {
      expect(testObj.store.getActions()[0].type).toEqual("CASH_OUT");
    });
  });
  it("should handle cashout when complete", async () => {
    jest.mock("firebase");
    const testObj = setup(
      {
        ...genericState,
        BlackJackReducer: {
          ...genericState.BlackJackReducer,
          phase: BlackJackPhase.COMPLETE,
        },
      },
      <BetBar state={4} />
    );
    await act(async () => {
      // @ts-ignore
      await testObj.wrapper
        ?.find('[test-id="cashoutBtn"]')
        .find("button")
        .props()
        // @ts-ignore
        .onClick();
    });
    await Promise.resolve().then(async () => {
      expect(testObj.store.getActions()[0].type).toEqual("CLEANUP_BLACKJACK");
    });
  });
  it("should handle betPlacement", async () => {
    jest.mock("firebase");
    const testObj = setup(genericState, <BetBar state={4} />);
    await act(async () => {
      // @ts-ignore
      await testObj.wrapper
        ?.find('[test-id="submitBtn"]')
        .find("button")
        .simulate("submit");
    });
    await Promise.resolve().then(() => {
      expect(testObj.store.getActions()[0].type).toEqual("CLEANUP_BLACKJACK");
      console.log(testObj.store.getActions());
    });
  });
});
