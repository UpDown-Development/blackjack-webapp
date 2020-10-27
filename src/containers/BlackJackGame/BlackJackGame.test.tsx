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

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Setup Game Component", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  const card: Card = {
    name: "Test Name",
    img: "Test link",
    value: 9001,
    isFaceUp: true,
  };
  const hand: Card[] = [card, card];
  const players: Player[] = [
    {
      name: "player",
      wallet: 50,
      currentBet: 0,
      hand: [],
      score: 0,
    } as Player,
    {
      name: "dealer",
      wallet: 50,
      currentBet: 0,
      hand: [],
      score: 0,
    } as Player,
  ];
  const genericState: BlackJack = {
    deck: deck,
    players: players,
    state: BlackJackState.BETTING,
    name: "BlackJack",
    numberOfDecks: 2,
  };
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
