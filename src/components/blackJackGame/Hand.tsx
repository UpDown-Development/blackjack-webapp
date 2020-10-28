import React from "react";
import { Typography } from "@material-ui/core";
import { Card } from "../../models/generic";

const Hand = (props: any) => {
  return (
    <>
      <Typography>{`${props.player.name}'s Hand`}</Typography>
      {props.player.hand.map((card: Card) => {
        return card.isFaceUp ? (
          <img src={card.img} alt={card.name} style={{ height: 120 }} />
        ) : (
          <img
            src={"http://localhost:3000/imgs/cards/backs/back1.png"}
            alt={"?"}
            style={{ height: 120 }}
          />
        );
      })}
    </>
  );
};

export default Hand;
