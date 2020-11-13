import React from "react";
import { Button, Paper, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import {
  cashOut,
  cleanUp,
  placeBet,
} from "../../redux/actions/BlackJackActions/BlackJackActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BlackJack, BlackJackPhase } from "../../models/generic";
import { RootState } from "../../redux/rootReducer";
import "./BetBar.css";

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
      handleNextGame(values);
    },
  });

  const handleNextGame = (values: any) => {
    Promise.all([dispatch(cleanUp(props.state, bjState))]).then(() => {
      setTimeout(() => {
        dispatch(placeBet(values.bet, bjState.players[0].wallet));
      }, 1500);
    });
  };

  const handleCashOut = () => {
    if (bjState.phase === BlackJackPhase.COMPLETE) {
      Promise.all([dispatch(cleanUp(props.state, bjState))]).then(() => {
        dispatch(cashOut(bjState.userId, bjState.players[0].wallet));
      });
    } else {
      dispatch(cashOut(bjState.userId, bjState.players[0].wallet));
    }
  };

  return (
    <div className={"betbar-container"}>
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
          <div className={"buttonContainer"}>
            <Button
              test-id="submitBtn"
              disabled={bjState.phase !== BlackJackPhase.COMPLETE}
              type="submit"
            >
              Place Bet
            </Button>
            <Button
              disabled={bjState.phase !== BlackJackPhase.COMPLETE}
              test-id="cashoutBtn"
              onClick={() => handleCashOut()}
              variant={"outlined"}
            >
              Cash Out
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default BetBar;
