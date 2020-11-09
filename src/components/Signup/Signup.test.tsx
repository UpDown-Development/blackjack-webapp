import React from "react";
import { setup, wait } from "../../setupTests";
import Signup from "./Signup";
import { genericState } from "../../utils/testData";

describe("Signup Component", () => {
  it("should show the correct text", function () {
    const testObj = setup(genericState, <Signup />);
    // @ts-ignore
    expect(testObj.wrapper.text()).toEqual("​​SignupGoogleFacebook");
  });
  it("should submit", function () {
    const testObj = setup(genericState, <Signup />);
    testObj.wrapper?.find("form").simulate("submit");
    const spy = spyOn(testObj.store, "dispatch").and.stub();
    wait(spy);
  });
});
