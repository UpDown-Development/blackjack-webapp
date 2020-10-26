import React, {useState} from "react";
import {motion} from "framer-motion";
import {Button, Paper, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import styles from './setupGame.module.scss'
import {useDispatch} from "react-redux";
import {initBlackJack} from "../../redux/actions/blackJackActions";
import {Redirect} from "react-router";


const SetupGame = () => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

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
      decks: 2,
      wallet: 50,
    },
    onSubmit: values => {
      dispatch(initBlackJack(values.decks, values.wallet))
      setRedirect(true)
    }
  })

  return (
    <motion.div
      className={styles.container}
      variants={animationVariants}
      initial={{x: -1000}}
      animate={{x: 0}}
      exit="exit"
    >
      <Paper className={styles.paper}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            variant={'filled'}
            id='wallet'
            label='Wallet'
            type='number'
            value={formik.values.wallet}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            variant={'filled'}
            id='decks'
            label='Number Of decks'
            type='number'
            value={formik.values.decks}
            onChange={formik.handleChange}
          />
          <Button type="submit" >Play</Button>
        </form>
      </Paper>
      { redirect && <Redirect to={'/play'} /> }
    </motion.div>
  )
}

export default SetupGame;
