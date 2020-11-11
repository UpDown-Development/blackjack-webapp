import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Paper, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import "./SetupGame.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initBlackJack } from "../../redux/actions/BlackJackActions/BlackJackActions";
import { Redirect } from "react-router";
import { RootState } from "../../redux/rootReducer";
import { BlackJack, GameUser } from "../../models/generic";

const SetupGame = () => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const game: BlackJack = useSelector(
    (state: RootState) => state.BlackJackReducer,
    shallowEqual
  );
  const user: GameUser = useSelector(
    (state: RootState) => state.UserReducer,
    shallowEqual
  );

  const animationVariants = {
    exit: {
      x: -2000,
      transition: {
        ease: "easeInOut",
      },
    },
  };

  const formik = useFormik({
    initialValues: {
      decks: 3,
      wallet: 50,
    },
    onSubmit: (values) => {
      dispatch(initBlackJack(game.userId, values.decks, values.wallet));
      setRedirect(true);
    },
  });

  return (
    <motion.div
      className={"container"}
      variants={animationVariants}
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      exit="exit"
    >
      <Paper className={"paper"}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            InputProps={{ inputProps: { min: 1, max: user.netWorth } }}
            variant={"filled"}
            required
            id="wallet"
            label="Wallet"
            type="number"
            value={formik.values.wallet}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            InputProps={{ inputProps: { min: 2, max: 10 } }}
            variant={"filled"}
            required
            id="decks"
            label="Number Of decks"
            type="number"
            value={formik.values.decks}
            onChange={formik.handleChange}
          />
          <div className={"buttonContainer"}>
            <Button variant={"outlined"} type="submit">
              Play
            </Button>
          </div>
        </form>
      </Paper>
      {redirect && <Redirect to={"/play"} />}
    </motion.div>
  );
};

export default SetupGame;
