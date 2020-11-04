import React from "react";
import { Button, Paper, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import {
  cashOut,
  cleanUp,
  placeBet,
} from "../../redux/actions/BlackJackActions/blackJackActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  BlackJack,
  BlackJackState as BJS,
  BlackJackState,
} from "../../models/generic";
import { RootState } from "../../redux/rootReducer";
import styles from "./betBar.module.scss";

const BetBar = () => {
  const dispatch = useDispatch();
  const bjState: BlackJack = useSelector(
    (state: RootState) => state.BlackJackReducer,
    shallowEqual
  );
  const formik = useFormik({
    initialValues: {
      bet: 5,
    },
    onSubmit: (values) => {
      dispatch(placeBet(values.bet, bjState.players[0].wallet));
    },
  });

  const displayWinMessage = () => {
    let winMessage: string = "It's a push";
    let state = 0;

    const player = bjState.players[0];
    const dealer = bjState.players[1];

    if (
      // @ts-ignore
      (player.score > dealer.score && player.score <= 21) ||
      // @ts-ignore
      (player.score <= 21 && dealer.score > 21)
    ) {
      winMessage = "You won!!!";
      state = 1;
    } else {
      if (
        // @ts-ignore
        (dealer.score > player.score && dealer.score <= 21) ||
        // @ts-ignore
        (dealer.score <= 21 && player.score > 21)
      ) {
        winMessage = "You lost. Better luck next time...";
        state = -1;
      }
    }
    return { winMessage, state };
  };

  const handleNextGame = () => {
    dispatch(cleanUp(displayWinMessage().state, bjState));
  };

  const handleCashOut = () => {
    if (bjState.state === BlackJackState.COMPLETE) {
      dispatch(cleanUp(displayWinMessage().state, bjState));
    }
    dispatch(cashOut(bjState.userId, bjState.players[0].wallet));
  };

  return (
    <div className={styles.container}>
      <Paper>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            variant={"filled"}
            id="bet"
            label="Bet"
            type="number"
            value={formik.values.bet}
            onChange={formik.handleChange}
          />
          <div className={styles.buttonContainer}>
            <Button
              disabled={bjState.state !== BlackJackState.BETTING}
              type="submit"
            >
              Place Bet
            </Button>
            <Button
              disabled={
                !(
                  bjState.state === BlackJackState.BETTING ||
                  bjState.state === BlackJackState.COMPLETE
                )
              }
              onClick={() => handleCashOut()}
              variant={"outlined"}
            >
              Cash Out
            </Button>
            {bjState.state === BJS.COMPLETE && (
              <Button variant={"outlined"} onClick={() => handleNextGame()}>
                Next game
              </Button>
            )}
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default BetBar;
