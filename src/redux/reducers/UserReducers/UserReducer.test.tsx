import { failTest, setup } from "../../../setupTests";
import { genericState } from "../../../utils/testData";
import SetupGame from "../../../containers/SetupGame/SetupGame";
import React from "react";
import UserReducer, { defaultState } from "./UserReducer";

describe("User Reducer", () => {
  it("renders sets user loading", async () => {
    const result = UserReducer(defaultState, {
      type: "USER_LOADING",
    });

    expect(result.loading).toEqual(true);
  });
  it("sets net worth", async () => {
    const result = UserReducer(defaultState, {
      type: "LOAD_NET_WORTH",
      payload: {
        netWorth: 1234,
      },
    });

    expect(result.netWorth).toEqual(1234);
  });
  it("sets signup success", async () => {
    const result = UserReducer(defaultState, {
      type: "USER_SIGNUP_SUCCESS",
      payload: genericState.UserReducer.user,
    });

    expect(result.user).toEqual(genericState.UserReducer.user);
  });
  it("sets user signup error", async () => {
    const result = UserReducer(genericState.UserReducer, {
      type: "USER_SIGNUP_ERROR",
      payload: "something went wrong",
    });

    expect(result.loading).toEqual(false);
    expect(result.errorMessage).toEqual("something went wrong");
  });
  it("sets user login success", async () => {
    const result = UserReducer(genericState.UserReducer, {
      type: "USER_LOGIN_SUCCESS",
      payload: genericState.UserReducer.user,
    });

    expect(result.loading).toEqual(false);
    expect(result.user).toEqual(genericState.UserReducer.user);
  });
  it("sets user login error", async () => {
    const result = UserReducer(genericState.UserReducer, {
      type: "USER_LOGIN_ERROR",
      payload: "Error",
    });

    expect(result.loading).toEqual(false);
    expect(result.errorMessage).toEqual("Error");
  });
  it("updates user net worth", async () => {
    const result = UserReducer(genericState.UserReducer, {
      type: "UPDATE_NET_WORTH",
      payload: 1234,
    });

    expect(result.netWorth).toEqual(1234);
  });
  it("should do nothing", async () => {
    const result = UserReducer(genericState.UserReducer, {
      type: "BOOGIEWOOGIE",
    });
    expect(result).toEqual(genericState.UserReducer);
  });
});
