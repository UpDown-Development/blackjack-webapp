import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { initBlackJack } from "../../redux/actions/blackJackActions";
import { Card, BlackJackState } from "../../models/generic";
import BlackJackBetting from "../../components/BlackJackBetting/BlackJackBetting";
import {motion} from 'framer-motion'

const BlackJackGame = () => {
  const dispatch = useDispatch();
  const blackjackState = useSelector(
      (state: RootState) => state.BlackJackReducer,
      shallowEqual
  );

  const showCurrentState = () => {
    if (blackjackState.state === BlackJackState.BETTING) {
      console.log("This ran")
      return(<BlackJackBetting />)
    }

  }

  return (
      <motion.div>
        {
          showCurrentState()
        }
      </motion.div>
  );
};

export default BlackJackGame;
