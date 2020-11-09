import React from "react";
import { shallow } from "enzyme";
import Hand from "./Hand";
import { card, players } from "../../utils/testData";

describe("Hand Component", () => {
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
    expect(component.text()).toEqual("<AnimateSharedLayout />");
  });
});
