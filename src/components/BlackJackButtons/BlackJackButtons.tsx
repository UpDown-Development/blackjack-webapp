import React from "react";
import {
  dealCard,
  doubleDown,
  endPlaying,
  insure,
  split,
} from "../../redux/actions/BlackJackActions/BlackJackActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BlackJack, BlackJackPhase, Card } from "../../models/generic";
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

  const sameCard = (card1: Card, card2: Card) => {
    let status = false;

    try {
      const cardNames = [card1, card2].map((x) => {
        return x.name.split(" ")[0];
      });

      status = cardNames[0] === cardNames[1];
    } catch (e) {}

    return status;
  };

  const player = bjState.players[0];

  const handleHit = (handIndex: number) => {
    dispatch(dealCard(bjState.deck, bjState.players[0], handIndex));
  };

  const handleStay = () => {
    dispatch(endPlaying(bjState.players[1].hand, bjState.players[1]));
  };

  const handleInsurance = () => {
    dispatch(insure(bjState.players[0].currentBet, bjState.players[0].wallet));
  };

  const handleDoubleDown = () => {
    dispatch(
      doubleDown(
        bjState.players[0].currentBet,
        bjState.players[0].wallet,
        bjState.players[0],
        bjState.deck
      )
    );
    dispatch(endPlaying(bjState.players[1].hand, bjState.players[0]));
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

  const handleSplit = () => {
    dispatch(split(player, bjState, bjState.deck));
  };

  return (
    <div className={"bjgame-buttons-container"}>
      <Button
        disabled={
          bjState.players[0].hand.length > 2 ||
          bjState.phase !== BlackJackPhase.PLAYER_PLAYING
        }
        variant={"outlined"}
        className={classes.button}
        test-id="doubleDown"
        onClick={() => handleDoubleDown()}
      >
        Double Down
      </Button>
      <Button
        disabled={
          !sameCard(player.hand[0], player.hand[1]) ||
          player.secondHand.length > 1
        }
        variant={"outlined"}
        className={classes.button}
        onClick={() => handleSplit()}
      >
        Split
      </Button>
      <Button
        disabled={!checkForAce()}
        variant={"outlined"}
        test-id="insurance"
        className={classes.button}
        onClick={() => handleInsurance()}
      >
        Insurance
      </Button>
      <Button
        disabled={
          bjState.phase !== BlackJackPhase.PLAYER_PLAYING ||
          // @ts-ignore
          bjState.players[0].score > 21
        }
        variant={"outlined"}
        className={classes.button}
        test-id="hit"
        onClick={() => handleHit(1)}
      >
        Hit
      </Button>
      {player.secondHand.length > 0 && (
        <Button
          disabled={
            // @ts-ignore
            bjState.players[0].secondScore > 21 ||
            bjState.phase !== BlackJackPhase.PLAYER_PLAYING
          }
          variant={"outlined"}
          className={classes.button}
          onClick={() => handleHit(2)}
        >
          Hit Hand 2
        </Button>
      )}
      <Button
        disabled={bjState.phase !== BlackJackPhase.PLAYER_PLAYING}
        variant={"outlined"}
        test-id="stay"
        className={classes.button}
        onClick={() => handleStay()}
      >
        Stay
      </Button>
    </div>
  );
};

export default BlackJackButtons;
