import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { BlackJackState, Card } from "../../models/generic";
import { motion } from "framer-motion";
import {
  cleanUp,
  dealCard,
  dealOpeningCards,
  endPlaying,
  moveToComplete,
  placeBet,
} from "../../redux/actions/blackJackActions";
import styles from "../SetupGame/setupGame.module.scss";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";

const BlackJackGame = () => {
  const dispatch = useDispatch();
  const blackjackState = useSelector(
    (state: RootState) => state.BlackJackReducer,
    shallowEqual
  );

  useEffect(() => {
    if (blackjackState.state === BlackJackState.DEALER_PLAYING) {
      dealerAI();
    }
  }, [blackjackState.players[1].score]);

  useEffect(() => {
    checkScore();
  }, [blackjackState.players[0].score]);

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
      dispatch(placeBet(values.bet, blackjackState.players[0].wallet));
    },
  });

  const dealerAI = () => {
    if (blackjackState.players[1].score < 18) {
      dispatch(dealCard(blackjackState.deck, blackjackState.players[1]));
      return true;
    } else {
      dispatch(moveToComplete());
    }
    return false;
  };

  const displayWinMessage = () => {
    let winMessage: string = "It's a push";
    let state = 0;

    const player = blackjackState.players[0];
    const dealer = blackjackState.players[1];

    console.log("Dealer's score", dealer.score);
    console.log("Player's score", player.score);

    if (
      (player.score > dealer.score && player.score <= 21) ||
      (player.score <= 21 && dealer.score > 21)
    ) {
      winMessage = "You won!!!";
      state = 1;
    } else if (
      (dealer.score > player.score && dealer.score <= 21) ||
      (dealer.score <= 21 && player.score > 21)
    ) {
      winMessage = "You lost. Better luck next time...";
      state = -1;
    }

    return { winMessage, state };
  };

  const checkScore = () => {
    if (blackjackState.players[0].score > 21) {
      dispatch(
        endPlaying(blackjackState.players[1].hand, blackjackState.players[1])
      );
    }
  };

  return (
    <motion.div
      className={styles.container}
      variants={animationVariants}
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      exit="exit"
    >
      {blackjackState.state === BlackJackState.DEALING &&
        dispatch(dealOpeningCards(blackjackState.deck, blackjackState.players))}
      {blackjackState.state !== BlackJackState.BETTING && (
        <Paper style={{ minWidth: 800, textAlign: "center" }}>
          <Typography>Dealer's Hand</Typography>
          {blackjackState.players[1].hand.map((card: Card) => {
            return card.isFaceUp ? (
              <img src={card.img} alt={card.name} style={{ height: 120 }} />
            ) : (
              <img
                src={"http://localhost:3000/imgs/cards/backs/back1.png"}
                alt={"?"}
                style={{ height: 120 }}
              />
            );
          })}
          <Typography>{blackjackState.players[1].score}</Typography>
          <Typography>Player's Hand</Typography>
          {blackjackState.players[0].hand.map((card: Card) => {
            return (
              <img src={card.img} alt={card.name} style={{ height: 120 }} />
            );
          })}
          <br />
          <Typography>{blackjackState.players[0].score}</Typography>
          {blackjackState.state === BlackJackState.PLAYER_PLAYING && (
            <div>
              <Button
                onClick={() =>
                  dispatch(
                    dealCard(blackjackState.deck, blackjackState.players[0])
                  )
                }
              >
                Hit
              </Button>
              <Button
                onClick={() =>
                  dispatch(
                    endPlaying(
                      blackjackState.players[1].hand,
                      blackjackState.players[1]
                    )
                  )
                }
              >
                Stay
              </Button>
            </div>
          )}
          <br />
          <Typography>Wallet: ${blackjackState.players[0].wallet}</Typography>
          <Typography>Bet: ${blackjackState.players[0].currentBet}</Typography>
          {blackjackState.state === BlackJackState.COMPLETE && (
            <>
              <Typography>{displayWinMessage().winMessage}</Typography>
              <Button
                onClick={() =>
                  dispatch(cleanUp(displayWinMessage().state, blackjackState))
                }
              >
                Next game
              </Button>
            </>
          )}
        </Paper>
      )}
      {blackjackState.state === BlackJackState.BETTING && (
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
          </form>
        </Paper>
      )}
    </motion.div>
  );
};

export default BlackJackGame;
