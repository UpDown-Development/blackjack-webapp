import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from "enzyme";
import thunk from "redux-thunk";
import { AnyAction, Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import SetupGame from "./SetupGame";
import { act } from "react-dom/test-utils";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Setup Game Component", () => {
  let store: Store<any, AnyAction>;
  let component: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  const setup = (data: any) => {
    store = mockStore({
      ...data,
    });

    const rootComponent = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SetupGame />
        </BrowserRouter>
      </Provider>
    );
    component = rootComponent;
  };

  it("should show the correct text", function () {
    setup({});
    expect(component.text()).toEqual("WalletNumber Of decksPlay");
  });

  it("should submit", function () {
    act(() => {
      setup({});
      component.find("form").simulate("submit");
      component.update();
    });
    expect(component.text()).toEqual("WalletNumber Of decksPlay");
    jest.resetAllMocks();
  });
});
