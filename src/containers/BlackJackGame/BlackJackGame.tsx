import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  BlackJack,
  BlackJackState,
  BlackJackState as BJS,
} from "../../models/generic";
import { motion } from "framer-motion";
import {
  cashOut,
  cleanUp,
  dealCard,
  dealOpeningCards,
  endPlaying,
  moveToComplete,
  placeBet,
} from "../../redux/actions/BlackJackActions/blackJackActions";
import styles from "./blackjackGame.module.scss";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import Hand from "../../components/blackJackGame/Hand";
import { Redirect } from "react-router";

// TODO: Make the "table" visible while betting, and place the bet form in that layout, disabled when appropriate
// TODO: Run out of money support, leave table support

export const BlackJackGame = () => {
  const dispatch = useDispatch();
  const bjState: BlackJack = useSelector(
    (state: RootState) => state.BlackJackReducer,
    shallowEqual
  );

  useEffect(() => {
    if (bjState.state === BJS.DEALER_PLAYING) {
      dealerAI();
    }
    // @ts-ignore
  }, [bjState.players[1].score]);

  useEffect(() => {
    checkScore();
    // @ts-ignore
  }, [bjState.players[0].score]);

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
      bet: 5,
    },
    onSubmit: (values) => {
      dispatch(placeBet(values.bet, bjState.players[0].wallet));
    },
  });

  const dealerAI = () => {
    // @ts-ignore
    if (bjState.players[1].score < 17) {
      dispatch(dealCard(bjState.deck, bjState.players[1]));
      return true;
    } else {
      dispatch(moveToComplete());
    }
    return false;
  };

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

  const checkScore = () => {
    // @ts-ignore
    if (bjState.players[0].score >= 21) {
      dispatch(endPlaying(bjState.players[1].hand, bjState.players[1]));
    }
  };

  const handleHit = () => {
    dispatch(dealCard(bjState.deck, bjState.players[0]));
  };

  const handleStay = () => {
    dispatch(endPlaying(bjState.players[1].hand, bjState.players[1]));
  };

  const handleNextGame = () => {
    dispatch(cleanUp(displayWinMessage().state, bjState));
  };

  const handleCashOut = () => {
    dispatch(cashOut(bjState.userId, bjState.players[0].wallet));
  };

  return (
    <motion.div
      className={styles.container}
      variants={animationVariants}
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      exit="exit"
    >
      {bjState.state === BlackJackState.CASHOUT && <Redirect to={"/"} />}
      <div className={styles.parent}>
        {bjState.state === BJS.DEALING &&
          dispatch(dealOpeningCards(bjState.deck, bjState.players))}
        {bjState.state !== BJS.BETTING && (
          <Paper style={{ minWidth: 800, textAlign: "center" }}>
            <div className={styles.dealerHand}>
              <Hand player={bjState.players[1]} />
              <Typography>{bjState.players[1].score}</Typography>
            </div>
            <div className={styles.playerHand}>
              <Hand player={bjState.players[0]} />
              <Typography>{bjState.players[0].score}</Typography>
            </div>
            {bjState.state === BJS.PLAYER_PLAYING && (
              <div>
                <Button data-test-id="hit" onClick={() => handleHit()}>
                  Hit
                </Button>
                <Button onClick={() => handleStay()}>Stay</Button>
              </div>
            )}
            <br />
            <Typography>Wallet: ${bjState.players[0].wallet}</Typography>
            <Typography>Bet: ${bjState.players[0].currentBet}</Typography>
            {bjState.state === BJS.COMPLETE && (
              <>
                <Typography>{displayWinMessage().winMessage}</Typography>
                <Button onClick={() => handleNextGame()}>Next game</Button>
              </>
            )}
          </Paper>
        )}
        {bjState.state === BJS.BETTING && (
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
              <Button type="submit">Place Bet</Button>
              <Button onClick={() => handleCashOut()} variant={"outlined"}>
                Cash Out
              </Button>
            </form>
          </Paper>
        )}
      </div>
    </motion.div>
  );
};
