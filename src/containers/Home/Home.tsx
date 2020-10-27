import React from "react";
import styles from "./home.module.scss";
import { motion } from "framer-motion";
import pips from "../../images/resources/4_pips.png";
import { Link } from "react-router-dom";

// local imports

const Home = () => {
  const animationVariants = {
    exit: {
      x: -2000,
      transition: {
        ease: "easeInOut",
      },
    },
    hover: {
      scale: 1,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={animationVariants}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit="exit"
      >
        <div className={styles.container}>
          <motion.img
            initial={{ width: 0, height: 0 }}
            animate={{ width: 700, height: 400, rotateX: 360, rotateZ: 360 }}
            transition={{ duration: 2 }}
            className={styles.pips}
            src={pips}
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 3 }}
            className={styles.title}
          >
            Blackjack
          </motion.h1>
        </div>
        <div className={styles.buttonContainer}>
          <motion.button
            variants={animationVariants}
            initial={{ y: 1000 }}
            animate={{ y: -50, scale: 0.7 }}
            transition={{ delay: 2.5, type: "spring", stiffness: 100 }}
            whileHover="hover"
            className={styles.button}
          >
            Stats
          </motion.button>
          <Link to={"/setup"}>
            <motion.button
              variants={animationVariants}
              initial={{ y: 1000 }}
              animate={{ y: 0, scale: 0.7 }}
              transition={{ delay: 2, type: "spring", stiffness: 100 }}
              whileHover="hover"
              className={styles.button}
            >
              Play
            </motion.button>
          </Link>
          <Link to={"play"}>
            <motion.button
              variants={animationVariants}
              initial={{ y: 1000 }}
              animate={{ y: -50, scale: 0.7 }}
              transition={{ delay: 3, type: "spring", stiffness: 100 }}
              whileHover="hover"
              style={{ fontSize: "16px" }}
              className={styles.button}
            >
              Customize
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
