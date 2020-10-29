import React from "react";
import Login from "./Login";
import { setup } from "../../setupTests";

describe("Login Component", () => {
  it("should show the correct text", function () {
    const testObj = setup({}, <Login />);
    // @ts-ignore
    expect(testObj.wrapper.text()).toEqual("​​Login");
  });
});
