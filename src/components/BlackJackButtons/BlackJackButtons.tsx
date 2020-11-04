import React from "react";
import styles from "../../containers/BlackJackGame/blackjackGame.module.scss";
import {
  dealCard,
  endPlaying,
} from "../../redux/actions/BlackJackActions/blackJackActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BlackJack } from "../../models/generic";
import { RootState } from "../../redux/rootReducer";
import { Button } from "@material-ui/core";

const BlackJackButtons = () => {
  const dispatch = useDispatch();
  const bjState: BlackJack = useSelector(
    (state: RootState) => state.BlackJackReducer,
    shallowEqual
  );

  const handleHit = () => {
    dispatch(dealCard(bjState.deck, bjState.players[0]));
  };

  const handleStay = () => {
    dispatch(endPlaying(bjState.players[1].hand, bjState.players[1]));
  };

  return (
    <div>
      <Button
        variant={"outlined"}
        className={styles.button}
        data-test-id="hit"
        onClick={() => handleHit()}
      >
        Hit
      </Button>
      <Button
        variant={"outlined"}
        className={styles.button}
        onClick={() => handleStay()}
      >
        Stay
      </Button>
    </div>
  );
};

export default BlackJackButtons;
