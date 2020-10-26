import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { initBlackJack } from "../../redux/actions/blackJackActions";
import { Card } from "../../models/generic";

const BlackJackGame = () => {
  const dispatch = useDispatch();
  const blackjackState = useSelector(
    (state: RootState) => state.BlackJackReducer,
    shallowEqual
  );
  return (
    <div>
      {blackjackState.deck.map((card: Card) => {
        return <img style={{ height: "70px" }} src={card.img} />;
      })}
    </div>
  );
};

export default BlackJackGame;
