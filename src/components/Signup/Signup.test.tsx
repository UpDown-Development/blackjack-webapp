import React from "react";
import { setup, wait } from "../../setupTests";
import Signup from "./Signup";
import { act } from "react-dom/test-utils";
import SetupGame from "../../containers/SetupGame/SetupGame";

describe("Signup Component", () => {
  it("should show the correct text", function () {
    const testObj = setup({}, <Signup />);
    // @ts-ignore
    expect(testObj.wrapper.text()).toEqual("​​Signup");
  });
  it("should submit", function () {
    const testObj = setup({}, <Signup />);
    testObj.wrapper?.find("form").simulate("submit");
    const spy = spyOn(testObj.store, "dispatch").and.stub();
    wait(spy);
  });
});
