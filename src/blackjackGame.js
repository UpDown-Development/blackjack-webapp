import React from "react";

import Typography from "@material-ui/core/Typography";

import _ from "lodash";

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const names = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const suits = ["spades", "clubs", "hearts", "diamonds"];

let deck = [];

indices.map((index) => {
  suits.map((suit) => {
    deck.push({
      name: names[index],
      value: values[index],
      suit: suit,
    });
  });
});

const addCard = (player, card) => {
  player.hand.push(card);
  player.score += card.value;
  if (card.name === "A") {
    player.hasAce = true;
  }
  if (player.hasAce) {
    player.aceScore = player.score + 10 <= 21 ? player.score + 10 : 0;
  }
  if (player.score > 21) {
    player.bust = true;
  }

  return player;
};

const blackjackGame = () => {
  const shuffledDeck = _.shuffle(deck);

  let dealer = {
    hand: [],
    score: 0,
    hasAce: false,
    aceScore: 0,
    bust: false,
  };

  let player = {
    hand: [],
    score: 0,
    hasAce: false,
    aceScore: 0,
    bust: false,
  };

  player = addCard(player, shuffledDeck.pop());
  player = addCard(player, shuffledDeck.pop());

  dealer = addCard(dealer, shuffledDeck.pop());
  dealer = addCard(dealer, shuffledDeck.pop());

  let winner;

  if (!player.bust && player.score < dealer.score) {
      winner = 'player'
  } else if (!dealer.bust && dealer.score < player.score) {
      winner = 'dealer'
  } else {
      winner = 'tie'
  }

  console.log(player, dealer);

  return (
    <div>
      <Typography>Player's hand:</Typography>
      {player.hand.map((card, index) => {
        return (
          <Typography>
            Card {index + 1}: {card.name} of {card.suit}
          </Typography>
        );
      })}
      <Typography>
        Score: {player.aceScore === 0 ? player.score : player.aceScore}{" "}
        {player.bust ? "bust" : ""}
      </Typography>
      <Typography>Dealer's hand:</Typography>
      {dealer.hand.map((card, index) => {
        return (
          <Typography>
            Card {index + 1}: {card.name} of {card.suit}
          </Typography>
        );
      })}
      <Typography>
        Score: {dealer.aceScore === 0 ? dealer.score : dealer.aceScore}{" "}
        {dealer.bust ? "bust" : ""}
      </Typography>
        <Typography>Winner: {winner}</Typography>
    </div>
  );
};

export default blackjackGame;
