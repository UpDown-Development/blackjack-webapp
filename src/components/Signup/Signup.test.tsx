import React from "react";
import { setup } from "../../setupTests";
import Signup from "./Signup";

describe("Signup Component", () => {
  it("should show the correct text", function () {
    const testObj = setup({}, <Signup />);
    // @ts-ignore
    expect(testObj.wrapper.text()).toEqual("​​Signup");
  });
});
