import { failTest, setup } from "../../setupTests";
import { genericState } from "../../utils/testData";
import React from "react";
import Toast from "./Toast";
import { ColorEnum } from "../../models/generic";
import { act } from "react-dom/test-utils";

describe("<Toast/>", () => {
  it("renders without crashing", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(
        genericState,
        <Toast color={ColorEnum.PUSH} message={"You Win"} />
      );
      expect(testObj).toBeTruthy();
    } catch (e) {
      failTest(e);
    }
  });
  it("shows a win message", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(
        genericState,
        <Toast color={ColorEnum.PUSH} message={"You Win"} />
      );
      expect(testObj.wrapper?.text()).toEqual("You Win");
    } catch (e) {
      failTest(e);
    }
  });
});
