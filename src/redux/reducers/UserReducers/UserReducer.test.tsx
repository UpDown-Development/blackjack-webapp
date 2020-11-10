import UserReducer, { defaultState } from "./userReducer";

describe("User Reducers", () => {
  it("should add a user", function () {
    const result = UserReducer(defaultState, {
      type: "USER_LOADING",
    });
    expect(result).toEqual({
      ...defaultState,
      loading: true,
    });
  });
  it("should signup a user", function () {
    const result = UserReducer(defaultState, {
      type: "USER_SIGNUP_SUCCESS",
      payload: {
        user: {},
      },
    });
    expect(result).toEqual({
      ...defaultState,
      user: { user: {} },
    });
  });
  it("should set error message", function () {
    const result = UserReducer(defaultState, {
      type: "USER_SIGNUP_ERROR",
      payload: "GET OUTTA HERE",
    });
    expect(result).toEqual({
      ...defaultState,
      errorMessage: "GET OUTTA HERE",
    });
  });
  it("should login a user", function () {
    const result = UserReducer(defaultState, {
      type: "USER_LOGIN_SUCCESS",
      payload: "DID IT IN ONE",
    });
    expect(result).toEqual({
      ...defaultState,
      user: "DID IT IN ONE",
    });
  });
  it("should display a login error", function () {
    const result = UserReducer(defaultState, {
      type: "USER_LOGIN_ERROR",
      payload: "GOT HIM",
    });
    expect(result).toEqual({
      ...defaultState,
      errorMessage: "GOT HIM",
    });
  });
});
