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
    jest.mock("firebase");
    const testObj = setup(
      genericState,
      <Toast color={ColorEnum.PUSH} message={"You Win"} />
    );
    expect(testObj.wrapper?.text()).toEqual("You Win");
  });
  it("should close toast", () => {
    const testObj = setup(
      genericState,
      <Toast color={ColorEnum.PUSH} message={"You Win"} />
    );
    act(() => {
      // @ts-ignore
      testObj.wrapper
        ?.find('[id="snackbar"]')
        .first()
        .props()
        // @ts-ignore
        .onClose();
    });
    testObj.wrapper?.update();
    expect(
      // @ts-ignore
      testObj.wrapper?.find('[id="snackbar"]').first().props().open.valueOf()
    ).toEqual(false);
  });
});
