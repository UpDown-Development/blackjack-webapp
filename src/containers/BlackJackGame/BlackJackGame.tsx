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
  cleanUp,
  dealCard,
  dealOpeningCards,
  endPlaying,
  moveToComplete,
} from "../../redux/actions/BlackJackActions/blackJackActions";
import styles from "./blackjackGame.module.scss";
import { Button, Typography } from "@material-ui/core";
import Hand from "../../components/Hand/Hand";
import { Redirect } from "react-router";
import StatsSidebar from "../../components/BlackJackHeader/statsSidebar";
import BetBar from "../../components/BetBar/BetBar";
import BlackJackButtons from "../../components/BlackJackButtons/BlackJackButtons";

// TODO: Split
// TODO: Blackjack
// TODO: Insurance

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
      player.score === 21 &&
      player.hand.length === 2 &&
      dealer.score !== 21
    ) {
      winMessage = "Holy FUCK you got a Blackjack!";
      state = 1.5;
    } else if (
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

  return (
    <motion.div
      className={styles.container}
      variants={animationVariants}
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      exit="exit"
    >
      <div className={styles.playedCards}>
        <div className={styles.handsContainer}>
          <div className={styles.dealerHand}>
            <Hand player={bjState.players[1]} />
          </div>
          <div className={styles.playerHand}>
            <Hand player={bjState.players[0]} />
          </div>
        </div>
        {bjState.state === BJS.COMPLETE && (
          <Typography>{displayWinMessage().winMessage}</Typography>
        )}
      </div>
      <div className={styles.sideBar}>
        <StatsSidebar />
        <BlackJackButtons />
        <BetBar state={displayWinMessage().state} />
      </div>
      {bjState.state === BlackJackState.CASHOUT && <Redirect to={"/"} />}
      {bjState.state === BJS.DEALING &&
        dispatch(dealOpeningCards(bjState.deck, bjState.players))}
    </motion.div>
  );
};
