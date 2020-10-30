import React from "react";
import { mount } from "enzyme";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { setup } from "../../setupTests";
import { Provider } from "react-redux";
import { genericState } from "../../utils/testData";

it("renders without crashing", () => {
  const testObj = setup(genericState);
  mount(
    <Provider store={testObj.store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});
