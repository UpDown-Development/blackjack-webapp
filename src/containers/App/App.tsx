import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { initBlackJack } from "../../redux/actions/blackJackActions";
import pips from "../../images/resources/4_pips.png";
import styles from "./app.module.scss";
import { motion } from "framer-motion";

function App() {
  const dispatch = useDispatch();
  const blackJackGame = useSelector(
    (state: RootState) => state.BlackJackReducer
  );

  const initGame = () => {
    dispatch(initBlackJack(2));
  };

  useEffect(() => {
    initGame();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <motion.img
          initial={{ y: -350 }}
          animate={{ y: 60 }}
          transition={{ duration: 2 }}
          className={styles.pips}
          src={pips}
        />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className={styles.title}
        >
          Blackjack
        </motion.h1>
      </div>
      <div className={styles.buttonContainer}>
        <motion.button
          initial={{ y: 250 }}
          animate={{ y: -50 }}
          transition={{ duration: 3 }}
          className={styles.button}
        >
          Stats
        </motion.button>
        <motion.button
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 3 }}
          className={styles.button}
        >
          Play
        </motion.button>
        <motion.button
          initial={{ y: 300 }}
          animate={{ y: -50 }}
          transition={{ duration: 3 }}
          style={{ fontSize: "22px" }}
          className={styles.button}
        >
          Customize
        </motion.button>
      </div>
    </div>
  );
}

export default App;
