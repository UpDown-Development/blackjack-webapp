import { motion } from "framer-motion";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { CurrentGame, GameUser } from "../../models/generic";
import { Link, Redirect } from "react-router-dom";
import styles from "./home.module.scss";
import { loadGameData } from "../../redux/actions/UserActions/userActions";

const Home = () => {
  const dispatch = useDispatch();
  const user: GameUser = useSelector(
    (state: RootState) => state.UserReducer,
    shallowEqual
  );

  const loadGame = () => {
    dispatch(loadGameData(user.user.user.uid, CurrentGame.BLACKJACK));
  };

  const animationVariants = {
    exit: {
      x: -2000,
      transition: {
        ease: "easeInOut",
      },
    },
  };

  const showHome = () => {
    if (user.user) {
      return (
        <Link to={"/blackjack"}>
          <button onClick={() => loadGame()} className={styles.button}>
            Blackjack
          </button>
        </Link>
      );
    } else {
      return (
        <motion.div className={styles.container}>
          <div className={styles.buttonContainer}>
            <Link to={"/login"}>
              <button className={styles.button}>Login</button>
            </Link>
            <Link to={"/signup"}>
              <button className={styles.button}>Signup</button>
            </Link>
          </div>
        </motion.div>
      );
    }
  };

  return (
    <motion.div
      variants={animationVariants}
      initial={{ x: 2000 }}
      animate={{ x: 0 }}
      exit="exit"
    >
      {showHome()}
    </motion.div>
  );
};

export default Home;
