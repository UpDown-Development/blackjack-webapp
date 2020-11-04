import React from "react";
import styles from "./blackjackHome.module.scss";
import { motion } from "framer-motion";
import pips from "../../images/resources/4_pips.png";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const BlackjackHome = () => {
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
      exit: {
        duration: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={animationVariants}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit="exit"
    >
      <div className={styles.logoContainer}>
        <motion.img
          initial={{ width: 0, height: 0 }}
          animate={{ width: 700, height: 400, rotateX: 360, rotateZ: 360 }}
          transition={{ duration: 2 }}
          className={styles.pips}
          src={pips}
        />
      </div>
      <div className={styles.titleContainer}>
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
        <motion.div
          variants={animationVariants}
          initial={{ y: 1000 }}
          animate={{ y: -50, scale: 0.7 }}
          transition={{ delay: 2.5, type: "spring", stiffness: 100 }}
          whileHover="hover"
          className={styles.button}
        >
          <Link to={"/stats"}>
            <Button variant={"outlined"}>Stats</Button>
          </Link>
        </motion.div>
        <motion.div
          variants={animationVariants}
          initial={{ y: 1000 }}
          animate={{ y: 0, scale: 0.7 }}
          transition={{ delay: 3, type: "spring", stiffness: 100 }}
          whileHover="hover"
          style={{ fontSize: "16px" }}
          className={styles.button}
        >
          <Link to={"/setup"}>
            <Button variant={"outlined"}>Play</Button>
          </Link>
        </motion.div>
        <motion.div
          variants={animationVariants}
          initial={{ y: 1000 }}
          animate={{ y: -50, scale: 0.7 }}
          transition={{ delay: 2, type: "spring", stiffness: 100 }}
          whileHover="hover"
          className={styles.button}
        >
          <Link to={"/settings"}>
            <Button variant={"outlined"}>Settings</Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlackjackHome;
