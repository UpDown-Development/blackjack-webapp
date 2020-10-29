import React from "react";
import Login from "./Login";
import { setup, wait } from "../../setupTests";
import Signup from "../Signup/Signup";

describe("Login Component", () => {
  it("should show the correct text", function () {
    const testObj = setup({}, <Login />);
    // @ts-ignore
    expect(testObj.wrapper.text()).toEqual("​​Login");
  });
  it("should submit", function () {
    const testObj = setup({}, <Login />);
    testObj.wrapper?.find("form").simulate("submit");
    const spy = spyOn(testObj.store, "dispatch").and.stub();
    wait(spy);
  });
});
