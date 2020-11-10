import React from "react";
import SetupGame from "./SetupGame";
import { setup, wait } from "../../setupTests";
import { genericState } from "../../utils/testData";
import "firebase";

describe("Setup Game Component", () => {
  beforeEach(() => {
    jest.mock("firebase");
  });

  it("should show the correct text", function () {
    const testObj = setup(genericState, <SetupGame />);
    expect(testObj.wrapper?.text()).toEqual("Wallet *Number Of decks *Play");
  });

  it("should submit", async function () {
    try {
      const testObj = setup(genericState, <SetupGame />);
      testObj.wrapper?.find("form").simulate("submit");
      const spy = spyOn(testObj.store, "dispatch").and.stub();
      await wait(spy);
    } catch (e) {
      console.log("HIT CATCH IN TEST...");
    }
  });
});
