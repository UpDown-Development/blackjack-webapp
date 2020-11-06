import React from "react";
import { Typography } from "@material-ui/core";
import { Card } from "../../models/generic";
import { AnimateSharedLayout, motion } from "framer-motion";
import styles from "./Hand.module.scss";

const Hand = (props: any) => {
  return (
    <div className={styles.container}>
      <AnimateSharedLayout>
        <motion.div layout>
          {props.player.hand.map((card: Card, index: number) => {
            return card.isFaceUp ? (
              <motion.img
                initial={{ x: -1000, y: -1000 }}
                animate={{ x: 0, y: 0 }}
                transition={{ type: "circIn", delay: card.delay }}
                whileHover={{ scale: 1.3 }}
                src={card.img}
                alt={card.name}
                className={
                  props.player.name === "Dealer"
                    ? styles.dealerCard
                    : styles.playingCard
                }
              />
            ) : (
              <motion.img
                initial={{ x: -1000, y: -1000 }}
                animate={{ x: 0, y: 0 }}
                transition={{ type: "circIn", delay: index * 2 }}
                src={"http://localhost:3000/imgs/cards/backs/back1.png"}
                alt={"?"}
                className={
                  props.player.name === "Dealer"
                    ? styles.dealerCard
                    : styles.playingCard
                }
              />
            );
          })}
        </motion.div>
      </AnimateSharedLayout>
    </div>
  );
};

export default Hand;