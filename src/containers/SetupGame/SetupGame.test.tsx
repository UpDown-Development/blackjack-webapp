import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from "enzyme";
import thunk from "redux-thunk";
import { AnyAction, Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import SetupGame from "./SetupGame";
import { act } from "react-dom/test-utils";
import { setup, wait } from "../../setupTests";
import { genericState } from "../../utils/testData";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Setup Game Component", () => {
  it("should show the correct text", function () {
    const testObj = setup(genericState, <SetupGame />);
    expect(testObj.wrapper?.text()).toEqual("Wallet *Number Of decks *Play");
  });

  it("should submit", function () {
    const testObj = setup(genericState, <SetupGame />);
    testObj.wrapper?.find("form").simulate("submit");
    const spy = spyOn(testObj.store, "dispatch").and.stub();
    wait(spy);
  });
});
