import React from "react";
import SetupGame from "./SetupGame";
import { setup, wait } from "../../setupTests";
import { genericState } from "../../utils/testData";

describe("Setup Game Component", () => {
  it("should show the correct text", function () {
    const testObj = setup(genericState, <SetupGame />);
    expect(testObj.wrapper?.text()).toEqual("Wallet *Number Of decks *Play");
  });

  it("should submit", function () {
    const testObj = setup(genericState, <SetupGame />);
    testObj.wrapper?.find("form").simulate("submit");
    const spy = spyOn(testObj.store, "dispatch").and.stub();
    wait(spy);
  });
});
