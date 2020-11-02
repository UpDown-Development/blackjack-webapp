import React from "react";
import { Typography } from "@material-ui/core";
import { Card } from "../../models/generic";
import { AnimateSharedLayout, motion } from "framer-motion";

const Hand = (props: any) => {
  return (
    <div>
      <Typography>{`${props.player.name}'s Hand`}</Typography>
      <AnimateSharedLayout>
        <motion.div layout>
          {props.player.hand.map((card: Card, index: number) => {
            return card.isFaceUp ? (
              <motion.img
                initial={{ x: -1000, y: -1000 }}
                animate={{ x: 0, y: 0 }}
                transition={{ type: "circIn", delay: card.delay }}
                src={card.img}
                alt={card.name}
                style={{ height: 120, margin: "0 10px" }}
              />
            ) : (
              <motion.img
                initial={{ x: -1000, y: -1000 }}
                animate={{ x: 0, y: 0 }}
                transition={{ type: "circIn", delay: index * 2 }}
                src={"http://localhost:3000/imgs/cards/backs/back1.png"}
                alt={"?"}
                style={{ height: 120 }}
              />
            );
          })}
        </motion.div>
      </AnimateSharedLayout>
    </div>
  );
};

export default Hand;
