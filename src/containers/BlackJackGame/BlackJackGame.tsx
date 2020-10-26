import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {  BlackJackState } from "../../models/generic";
import BlackJackBetting from "../../components/BlackJackBetting/BlackJackBetting";
import {motion} from 'framer-motion'
import { dealOpeningCards} from "../../redux/actions/blackJackActions";
import BlackJackPlaying from "../../components/BlackJackPlaying/BlackJackPlaying";

const BlackJackGame = () => {
  const dispatch = useDispatch();
  const blackjackState = useSelector(
      (state: RootState) => state.BlackJackReducer,
      shallowEqual
  );

  const showCurrentState = () => {
    if (blackjackState.state === BlackJackState.BETTING) {
      return(<BlackJackBetting />)
    } else if (blackjackState.state === BlackJackState.DEALING) {
      dispatch(dealOpeningCards(blackjackState.deck))
    } else if (blackjackState.state === BlackJackState.PLAYING) {
      return(<BlackJackPlaying />)
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
