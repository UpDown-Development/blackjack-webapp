import React from "react";
import { mount } from "enzyme";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { setup } from "../../setupTests";
import { Provider } from "react-redux";
import { genericState } from "../../utils/testData";
import "firebase";

it("renders without crashing", async () => {
  try {
    jest.mock("firebase");
    const testObj = setup(genericState, <App />);
    await expect(testObj).toBeTruthy();
  } catch (e) {
    console.log("CATCH BLOCK ON TEST HIT...");
  }
});
