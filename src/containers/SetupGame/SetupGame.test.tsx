import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from "enzyme";
import thunk from "redux-thunk";
import { AnyAction, Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import SetupGame from "./SetupGame";
import { act } from "react-dom/test-utils";
import { setup } from "../../setupTests";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Setup Game Component", () => {
  it("should show the correct text", function () {
    const testObj = setup({}, <SetupGame />);
    expect(testObj.wrapper?.text()).toEqual("WalletNumber Of decksPlay");
  });

  it("should submit", function () {
    act(() => {
      const testObj = setup({}, <SetupGame />);
      testObj.wrapper?.find("form").simulate("submit");
      testObj.wrapper?.update();
      expect(testObj.wrapper?.text()).toEqual("WalletNumber Of decksPlay");
    });
  });
});
