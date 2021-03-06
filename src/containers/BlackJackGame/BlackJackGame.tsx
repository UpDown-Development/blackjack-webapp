import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import "./blackjackGame.css";
import {
  checkScore,
  ConditionalRender,
  dealerAI,
  displayWinMessage,
} from "./blackJackGame.helper";

import { RootState } from "../../redux/rootReducer";
import { BlackJack, BlackJackPhase as BJS } from "../../models/generic";
import { animationVariants } from "../../theme";

import Hand from "../../components/Hand/Hand";
import StatsSidebar from "../../components/StatsSidebar/StatsSidebar";
import BetBar from "../../components/BetBar/BetBar";
import BlackJackButtons from "../../components/BlackJackButtons/BlackJackButtons";

export const BlackJackGame = () => {
  const dispatch = useDispatch();
  const bjState: BlackJack = useSelector(
    (state: RootState) => state.BlackJackReducer,
    shallowEqual
  );

  const player = bjState.players[0];
  const dealer = bjState.players[1];

  useEffect(() => {
    if (bjState.phase === BJS.DEALER_PLAYING) {
      dealerAI(dispatch, bjState.deck, dealer);
    }
  }, [dealer.score]);

  useEffect(() => {
    if (bjState.players[0].secondHand === undefined) {
      checkScore(dispatch, player, dealer);
    }
  }, [player.score]);

  return (
    <motion.div
      className={"bjgame-container"}
      variants={animationVariants}
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      exit="exit"
    >
      <div className={"playedCards"}>
        <div className={"hand-container"}>
          <Hand player={dealer} hand={dealer.hand} />
        </div>
        <div className={"hand-container"}>
          <Hand player={player} hand={player.hand} />
          {player.secondHand && (
            <div className={"second-hand-container"}>
              <Hand player={player} hand={player.secondHand} />
            </div>
          )}
        </div>
        <ConditionalRender state={bjState} dispatch={dispatch} />
      </div>
      <div className={"bjgame-sidebar"}>
        <StatsSidebar />
        <BlackJackButtons />
        <BetBar state={displayWinMessage(dispatch, player, dealer).state} />
      </div>
    </motion.div>
  );
};
