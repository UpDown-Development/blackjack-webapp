import { failTest, setup } from "../../setupTests";
import { genericState, players } from "../../utils/testData";
import React from "react";
import Login from "./Login";
import { set } from "immer/dist/utils/common";
import { act } from "react-dom/test-utils";
import { useFormik } from "formik";
import Signup from "../Signup/Signup";
import { myFirebase } from "../../utils/firebaseConfig";
import { oAuth } from "../../redux/actions/UserActions/UserActions";

describe("<Login/>", () => {
  it("renders without crashing", async () => {
    jest.mock("firebase");
    const testObj = setup(genericState, <Login />);
    await expect(testObj).toBeTruthy();
  });
  it("should show login error", async () => {
    jest.mock("firebase");
    const testObj = setup(genericState, <Login />);
    await act(async () => {
      // @ts-ignore
      await testObj.wrapper
        ?.find('[test-id="submitBtn"]')
        .find("button")
        .simulate("submit");
    });
    await Promise.resolve().then(() => {
      expect(testObj.store.getActions()[0].type).toEqual("USER_LOADING");
      expect(testObj.store.getActions()[1].type).toEqual("USER_LOGIN_ERROR");
    });
  });
  it("should show login success", async () => {
    jest.mock("firebase");
    const testObj = setup(genericState, <Login />);
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
        ?.find('[test-id="submitBtn"]')
        .find("button")
        .simulate("submit");
    });
    await Promise.resolve().then(() => {
      expect(testObj.store.getActions()[0].type).toEqual("USER_LOADING");
      expect(testObj.store.getActions()[1]).toBeFalsy();
    });
  });
  it("should login with Google OAuth", async () => {
    jest.mock("firebase");
    const testObj = setup(genericState, <Login />);
    await act(async () => {
      // @ts-ignore
      await testObj.wrapper
        ?.find('[id="googleOAuthBtn"]')
        .find("button")
        .props()
        // @ts-ignore
        .onClick();
    });
    await Promise.resolve().then(() => {
      expect(testObj.store.getActions()[0].payload.code).toEqual(
        "auth/operation-not-supported-in-this-environment"
      );
    });
  });
  it("should login with Facebook OAuth", async () => {
    jest.mock("firebase");
    const testObj = setup(genericState, <Login />);
    await act(async () => {
      // @ts-ignore
      await testObj.wrapper
        ?.find('[id="facebookOAuthBtn"]')
        .find("button")
        .props()
        // @ts-ignore
        .onClick();
    });
    await Promise.resolve().then(() => {
      expect(testObj.store.getActions()[0].payload.code).toEqual(
        "auth/operation-not-supported-in-this-environment"
      );
    });
  });
});
