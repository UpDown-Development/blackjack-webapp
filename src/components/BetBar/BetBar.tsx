import React from "react";
import { Button, Paper, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import {
  cashOut,
  placeBet,
} from "../../redux/actions/BlackJackActions/blackJackActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BlackJack } from "../../models/generic";
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

  const handleCashOut = () => {
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
            <Button type="submit">Place Bet</Button>
            <Button onClick={() => handleCashOut()} variant={"outlined"}>
              Cash Out
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default BetBar;
