import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from "enzyme";
import thunk from "redux-thunk";
import { AnyAction, Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import { genericState } from "../../utils/testData";
import { BlackJackGame } from "./BlackJackGame";

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
          <BlackJackGame />
        </BrowserRouter>
      </Provider>
    );
    component = rootComponent;
  };
  it("should render", () => {
    setup({
      BlackJackReducer: genericState,
    });
    expect(component).toBeTruthy();
  });
});
