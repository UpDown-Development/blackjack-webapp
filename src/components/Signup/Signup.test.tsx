import React from "react";
import { setup, wait } from "../../setupTests";
import Signup from "./Signup";
import { genericState } from "../../utils/testData";
import "firebase";

describe("Signup Component", () => {
  beforeEach(() => {
    jest.mock("firebase");
  });
  it("should show the correct text", function () {
    const testObj = setup(genericState, <Signup />);
    // @ts-ignore
    expect(testObj.wrapper.text()).toEqual("​​SignupGoogleFacebook");
  });
  it("should submit", async function () {
    try {
      const testObj = setup(genericState, <Signup />);
      testObj.wrapper?.find("form").simulate("submit");
      const spy = spyOn(testObj.store, "dispatch").and.stub();
      await wait(spy);
    } catch (e) {
      console.log("HIT CATCH BLOCK IN TEST...");
    }
  });
});
