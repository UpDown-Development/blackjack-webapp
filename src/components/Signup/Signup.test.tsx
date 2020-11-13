import { failTest, setup } from "../../setupTests";
import { genericState, players } from "../../utils/testData";
import React from "react";
import Signup from "./Signup";
import BlackJackButtons from "../BlackJackButtons/BlackJackButtons";
import { act } from "react-dom/test-utils";
import firebase from "firebase";

describe("<Signup/>", () => {
  it("renders without crashing", async () => {
    afterAll(async () => {
      await firebase.firestore().disableNetwork();
    });
    try {
      jest.mock("firebase");
      const testObj = setup(genericState, <Signup />);
      await expect(testObj).toBeTruthy();
    } catch (e) {
      failTest(e);
    }
  });
  it("should show signup error", async () => {
    jest.mock("firebase");
    const testObj = setup(genericState, <Signup />);
    await act(async () => {
      // @ts-ignore
      await testObj.wrapper
        ?.find('[test-id="signupEmailandPassword"]')
        .find("button")
        .simulate("submit");
    });
    await Promise.resolve().then(() => {
      expect(testObj.store.getActions()[0].type).toEqual("USER_LOADING");
      expect(testObj.store.getActions()[1].type).toEqual("USER_SIGNUP_ERROR");
    });
  });
  it("should show signup success", async () => {
    jest.mock("firebase");
    const testObj = setup(genericState, <Signup />);
    await act(async () => {
      // @ts-ignore
      await testObj.wrapper
        ?.find('[id="email"]')
        .find("input")
        .simulate("change", {
          target: { name: "email", value: "test@test.com" },
        });
      await testObj.wrapper
        ?.find('[id="password"]')
        .find("input")
        .simulate("change", { target: { name: "password", value: "12345" } });
      await testObj.wrapper
        ?.find('[test-id="signupEmailandPassword"]')
        .find("button")
        .simulate("submit");
    });
    await Promise.resolve().then(() => {
      expect(testObj.store.getActions()[0].type).toEqual("USER_LOADING");
      expect(testObj.store.getActions()[1]).toBeFalsy();
    });
  });
});
