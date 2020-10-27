import React, {useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {BlackJackState, Card, Player} from "../../models/generic";
import {motion} from 'framer-motion'
import {dealCard, dealOpeningCards, endPlaying, placeBet} from "../../redux/actions/blackJackActions";
import styles from "../SetupGame/setupGame.module.scss";
import {Button, Paper, TextField, Typography} from "@material-ui/core";
import {useFormik} from "formik";

const BlackJackGame = () => {
  const dispatch = useDispatch();
  const blackjackState = useSelector(
    (state: RootState) => state.BlackJackReducer,
    shallowEqual
  );


  const animationVariants = {
    exit: {
      x: -2000,
      transition: {
        ease: "easeInOut",
      },
    }
  };

  const formik = useFormik({
    initialValues: {
      bet: 5,
    },
    onSubmit: values => {
      dispatch(placeBet(values.bet, blackjackState.players[0].wallet))
    }
  })

  const dealerAI = () => {
    if (blackjackState.players[1].score < 18) {
      dispatch(dealCard(blackjackState.deck, blackjackState.players[1]))
      return true;
    }
    return false;
  }


  useEffect(() => {
    if (blackjackState.players[0].score > 21) {
      dispatch(endPlaying(blackjackState.players[1].hand))
    }
  }, [])


  return (
    <motion.div
      className={styles.container}
      variants={animationVariants}
      initial={{x: -1000}}
      animate={{x: 0}}
      exit="exit"
    >
      {blackjackState.state === BlackJackState.DEALING && dispatch(dealOpeningCards(blackjackState.deck, blackjackState.players))}
      {blackjackState.state !== BlackJackState.BETTING &&
      <Paper style={{minWidth: 800, textAlign: 'center'}}>
          <Typography>Dealer's Hand</Typography>
        {
          blackjackState.players[1].hand.map((card: Card) => {
            return card.isFaceUp ? (
              <img src={card.img} alt={card.name} style={{height: 120}}/>
            ) : (
              <img src={'http://localhost:3000/imgs/cards/backs/back1.png'} alt={'?'} style={{height: 120}}/>
            )
          })
        }
          <Typography>{blackjackState.players[1].score}</Typography>
          <Typography>Player's Hand</Typography>
        {
          blackjackState.players[0].hand.map((card: Card) => {
            return <img src={card.img} alt={card.name} style={{height: 120}}/>
          })
        }
          <br/>
          <Typography>{blackjackState.players[0].score}</Typography>
        {blackjackState.state === BlackJackState.PLAYING &&
        <div>
            <Button onClick={() => dispatch(dealCard(blackjackState.deck, blackjackState.players[0]))}>Hit</Button>
            <Button onClick={() => dispatch(endPlaying(blackjackState.players[1].hand))}>Stay</Button>
        </div>
        }
      </Paper>
      }
      {blackjackState.state === BlackJackState.BETTING &&
      <Paper>
          <form onSubmit={formik.handleSubmit}>
              <TextField
                  fullWidth
                  variant={'filled'}
                  id='bet'
                  label='Bet'
                  type='number'
                  value={formik.values.bet}
                  onChange={formik.handleChange}
              /><Button type="submit">Place Bet</Button>
          </form>
      </Paper>}
    </motion.div>
  );
};

export default BlackJackGame;
