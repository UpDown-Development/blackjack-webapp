import React from "react";
import { mount } from "enzyme";
import App from "../App/App";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  mount(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
