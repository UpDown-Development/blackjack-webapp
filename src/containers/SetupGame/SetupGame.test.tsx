import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from "enzyme";
import thunk from "redux-thunk";
import { AnyAction, Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import SetupGame from "./SetupGame";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Setup Game Component", () => {
  let store: Store<any, AnyAction>;
  let component: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  const setup = (data: any) => {
    store = mockStore({
      ...data,
    });

    store.dispatch = jest.fn();

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

  it("should submit", async function () {
    setup({});
    Promise.all([component.find("form").simulate("submit")])
      .then(() => {
        expect(store.dispatch).toHaveBeenCalled();
      })
      .catch(() => {
        expect(1).toEqual(2);
      });
  });
});
