import React from "react";
import { setup } from "../../setupTests";
import Navbar from "./Navbar";
import { genericState } from "../../utils/testData";

describe("Navbar Component", () => {
  it("should show the correct text", function () {
    const testObj = setup(genericState, <Navbar />);
    // @ts-ignore
    expect(testObj.wrapper.text()).toEqual("LoginSignup");
  });
});
