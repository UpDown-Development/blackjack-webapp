import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from "enzyme";
import thunk from "redux-thunk";
import { AnyAction, Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import BlackJackGame from "./BlackJackGame";
import { defaultState } from "../../redux/reducers/BlackJackReducer/blackJackReducer";
import { BlackJack, BlackJackState, Card, Player } from "../../models/generic";
import { deck } from "../../utils/blackJackDeck";
import { genericState } from "../../utils/testData";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Setup Game Component", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
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
