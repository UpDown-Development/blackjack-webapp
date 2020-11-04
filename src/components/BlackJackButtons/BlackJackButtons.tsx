import React from "react";
import {
  dealCard,
  endPlaying,
} from "../../redux/actions/BlackJackActions/blackJackActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BlackJack, BlackJackState } from "../../models/generic";
import { RootState } from "../../redux/rootReducer";
import { Button } from "@material-ui/core";
import styles from "./BlackJackButtons.module.scss";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "15px 15px",
    textDecoration: "none",
  },
}));

const BlackJackButtons = () => {
  const classes = useStyles();
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
    <div className={styles.container}>
      <Button
        disabled={bjState.state !== BlackJackState.PLAYER_PLAYING}
        variant={"outlined"}
        className={classes.button}
        data-test-id="hit"
        onClick={() => handleHit()}
      >
        Hit
      </Button>
      <Button
        disabled={bjState.state !== BlackJackState.PLAYER_PLAYING}
        variant={"outlined"}
        className={classes.button}
        onClick={() => handleStay()}
      >
        Stay
      </Button>
    </div>
  );
};

export default BlackJackButtons;
