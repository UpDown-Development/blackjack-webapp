import React from "react";
import { Card } from "../../models/generic";
import { AnimateSharedLayout, motion } from "framer-motion";
import "./Hand.css";

const Hand = (props: any) => {
  return (
    <div className={"hand-container"}>
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
                key={index}
                className={
                  props.player.name === "Dealer" ? "dealerCard" : "playingCard"
                }
              />
            ) : (
              <motion.img
                initial={{ x: -1000, y: -1000 }}
                animate={{ x: 0, y: 0 }}
                transition={{ type: "circIn", delay: index * 2 }}
                src={
                  "https://updowncardgames-3c85a.web.app/imgs/cards/cards/back4.png"
                }
                alt={"?"}
                key={index}
                className={
                  props.player.name === "Dealer" ? "dealerCard" : "playingCard"
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
