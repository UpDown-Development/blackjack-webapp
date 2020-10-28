import React from "react";
import configureStore from "redux-mock-store";
import { ReactWrapper, shallow } from "enzyme";
import thunk from "redux-thunk";
import { AnyAction, Store } from "redux";
import Hand from "./Hand";
import { card, players } from "../../utils/testData";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Setup Game Component", () => {
  let store: Store<any, AnyAction>;
  // @ts-ignore
  let component;
  const setup = (data: any) => {
    component = shallow(<Hand player={data} />);
  };

  it("should show the correct text", function () {
    setup({
      ...players[0],
      hand: [card, { ...card, isFaceUp: false }],
    });
    // @ts-ignore
    expect(component.text()).toEqual("player's Hand");
  });
});
