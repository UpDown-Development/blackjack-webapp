import React from "react";
import {
  dealCard,
  endPlaying,
  insure,
} from "../../redux/actions/BlackJackActions/blackJackActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BlackJack, BlackJackPhase } from "../../models/generic";
import { RootState } from "../../redux/rootReducer";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./BlackJackButtons.css";

const useStyles = makeStyles(() => ({
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

  const handleInsurance = () => {
    dispatch(insure(bjState.players[0].currentBet, bjState.players[0].wallet));
  };

  const checkForAce = () => {
    let hasAce = false;
    if (bjState.insurance) {
      return false;
    }
    try {
      hasAce = bjState.players[1].hand[0].value === 11;
    } catch (e) {}
    return hasAce;
  };

  return (
    <div className={"bjgame-buttons-container"}>
      <Button
        disabled={bjState.phase !== BlackJackPhase.PLAYER_PLAYING}
        variant={"outlined"}
        className={classes.button}
        data-test-id="hit"
        onClick={() => handleHit()}
      >
        Hit
      </Button>
      <Button
        disabled={bjState.phase !== BlackJackPhase.PLAYER_PLAYING}
        variant={"outlined"}
        className={classes.button}
        onClick={() => handleStay()}
      >
        Stay
      </Button>
      <Button
        disabled={!checkForAce()}
        variant={"outlined"}
        className={classes.button}
        onClick={() => handleInsurance()}
      >
        Insurance
      </Button>
    </div>
  );
};

export default BlackJackButtons;
