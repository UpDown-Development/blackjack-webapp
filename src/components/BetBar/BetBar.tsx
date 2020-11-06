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

interface propTypes {
  state: number;
}

const BetBar = (props: propTypes) => {
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

  const handleNextGame = () => {
    dispatch(cleanUp(props.state, bjState));
  };

  const handleCashOut = () => {
    if (bjState.state === BlackJackState.COMPLETE) {
      Promise.all([dispatch(cleanUp(props.state, bjState))]).then(() => {
        dispatch(cashOut(bjState.userId, bjState.players[0].wallet));
      });
    } else {
      dispatch(cashOut(bjState.userId, bjState.players[0].wallet));
    }
  };

  return (
    <div className={styles.container}>
      <Paper>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            InputProps={{
              inputProps: { min: 1, max: bjState.players[0].wallet },
            }}
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
