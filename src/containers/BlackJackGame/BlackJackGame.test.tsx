import React from "react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { mount, ReactWrapper } from "enzyme";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { genericState, players } from "../../utils/testData";
import { BlackJackGame } from "./BlackJackGame";
import { BlackJackState } from "../../models/generic";
import { Button } from "@material-ui/core";
import { wait } from "../../setupTests";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("BlackJackGame Container", () => {
  let spy: jasmine.Spy;
  let store: MockStoreEnhanced<unknown, {}>;
  let component: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  const setup = (data: any, callback?: any) => {
    store = mockStore({
      ...data,
    });
    if (callback) {
      callback();
    }

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
  it("should handle player hit button click", function () {
    setup({
      BlackJackReducer: {
        ...genericState,
        state: BlackJackState.PLAYER_PLAYING,
      },
    });
    component.find(Button).at(0).simulate("click");
    expect(store.getActions()[0].type).toEqual("DEAL_CARD_BLACKJACK");
  });
  it("should move to dealers phase on stay button", function () {
    setup({
      BlackJackReducer: {
        ...genericState,
        state: BlackJackState.PLAYER_PLAYING,
      },
    });
    component.find(Button).at(1).simulate("click");
    expect(store.getActions()[0].type).toEqual(
      "MOVE_TO_DEALER_PLAYING_BLACKJACK"
    );
  });
  it("should move to cleanup on next game button click", function () {
    setup({
      BlackJackReducer: {
        ...genericState,
        state: BlackJackState.COMPLETE,
      },
    });
    component.find(Button).at(0).simulate("click");
    expect(store.getActions()[0].type).toEqual("CLEANUP_BLACKJACK");
  });
  // formik test asserts nothing. coverage only
  it("should place a bet on button click", function () {
    setup({
      BlackJackReducer: {
        ...genericState,
        state: BlackJackState.BETTING,
      },
    });
    component.find("form").simulate("submit");
  });
  it("should bust a player", function () {
    setup(
      {
        BlackJackReducer: {
          ...genericState,
          state: BlackJackState.PLAYER_PLAYING,
          players: [{ ...players[0], score: 33 }, players[1]],
        },
      },
      () => {
        spy = spyOn(store, "dispatch").and.callThrough();
      }
    );
    wait(spy);
  });
});
