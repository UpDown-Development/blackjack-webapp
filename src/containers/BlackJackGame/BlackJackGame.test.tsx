import React from "react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { mount, ReactWrapper } from "enzyme";
import thunk from "redux-thunk";
import { AnyAction, Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import { genericState, players } from "../../utils/testData";
import { BlackJackGame } from "./BlackJackGame";
import { BlackJackState } from "../../models/generic";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("BlackJackGame Container", () => {
  let store: MockStoreEnhanced<unknown, {}>;
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

  it("should handle dealer hit", function () {
    setup({
      BlackJackReducer: {
        ...genericState,
        state: BlackJackState.DEALER_PLAYING,
      },
    });

    expect(store.getActions()[0].type).toEqual("DEAL_CARD_BLACKJACK");
  });

  it("should handle dealer stay", function () {
    setup({
      BlackJackReducer: {
        ...genericState,
        state: BlackJackState.DEALER_PLAYING,
        players: [players[0], { ...players[1], score: 19 }],
      },
    });

    expect(store.getActions()[0].type).toEqual("MOVE_TO_COMPLETE_BLACKJACK");
  });

  it("should handle dealer win", function () {
    setup({
      BlackJackReducer: {
        ...genericState,
        state: BlackJackState.COMPLETE,
        players: [
          { ...players[0], score: 20 },
          { ...players[1], score: 21 },
        ],
      },
    });

    expect(component.text()).toContain("...");
  });

  it("should handle player win", function () {
    setup({
      BlackJackReducer: {
        ...genericState,
        state: BlackJackState.COMPLETE,
        players: [
          { ...players[0], score: 21 },
          { ...players[1], score: 20 },
        ],
      },
    });

    expect(component.text()).toContain("!");
  });
});
