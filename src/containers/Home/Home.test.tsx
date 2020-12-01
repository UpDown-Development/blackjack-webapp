import { failTest, setup } from "../../setupTests";
import { genericState, players } from "../../utils/testData";
import React from "react";
import Home from "./Home";
import UserReducer from "../../redux/reducers/UserReducers/UserReducer";

describe("<Home/>", () => {
  it("renders without crashing", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <Home />);
      await expect(testObj).toBeTruthy();
    } catch (e) {
      failTest(e);
    }
  });
  it("renders login page else statement", async () => {
    try {
      jest.mock("firebase");
      const testObj = setup(
        { genericState, UserReducer: { ...UserReducer, user: null } },
        <Home />
      );
      expect(testObj.wrapper?.text()).toEqual("Card.ioLoginSignup");
    } catch (e) {
      failTest(e);
    }
  });
});
