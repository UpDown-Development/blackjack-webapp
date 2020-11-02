import { deck } from "../../../utils/blackJackDeck";
import { BlackJack, Card, CurrentGame, Player } from "../../../models/generic";
import _ from "lodash";
import { db } from "../../../utils/firebaseConfig";

export interface BlackJackAction {
  type: string;
  payload: any;
}

export const initBlackJack = (
  userId: string,
  numberOfDecks: number = 1,
  wallet: number
) => async (dispatch: any) => {
  const dealer: Player = {
    currentBet: 0,
    hand: [],
    wallet: 9999999999,
    name: "Dealer",
    score: 0,
  };

  const player: Player = {
    currentBet: 0,
    hand: [],
    wallet: wallet,
    name: "Player",
    score: 0,
  };

  const userData = db
    .collection("users")
    .doc(userId)
    .collection(CurrentGame.BLACKJACK)
    .doc("BLACKJACKInfo");

  userData
    .get()
    .then((res) => {
      // @ts-ignore
      const newBank = res.data().bank - wallet;
      userData.update({ bank: newBank }).then(() => {
        dispatch({
          type: "UPDATE_BANK",
          payload: newBank,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });

  const players: Player[] = [player, dealer];

  const blackJackDeck = shuffle(numberOfDecks);

  dispatch({
    type: "INIT_BLACKJACK",
    payload: {
      deck: blackJackDeck,
      players,
      numberOfDecks,
    },
  });
};

export const placeBet = (bet: number, wallet: number) => async (
  dispatch: any
) => {
  dispatch({
    type: "PLACE_BET_BLACKJACK",
    payload: {
      currentBet: bet,
      wallet: wallet - bet,
    },
  });
};

export const endPlaying = (hand: Card[], dealer: Player) => async (
  dispatch: any
) => {
  const dealerHand: Card[] = [];

  hand.forEach((card: Card) => {
    dealerHand.push({ ...card, isFaceUp: true });
  });
  Promise.all([
    dispatch({
      type: "MOVE_TO_DEALER_PLAYING_BLACKJACK",
      payload: dealerHand,
    }),
  ]).then(dispatch(calculateScore(dealerHand, dealer)));
};

export const cleanUp = (state: number, gameState: BlackJack) => async (
  dispatch: any
) => {
  const player = gameState.players[0];
  const deck = gameState.deck;
  const deckNum = gameState.numberOfDecks;

  const doShuffle = _.random(15, 30, false);

  let newDeck: Card[];
  let wallet;

  if (state === -1) {
    wallet = player.wallet;
  } else if (state === 0) {
    wallet = player.wallet + player.currentBet;
  } else if (state === 1) {
    wallet = player.wallet + player.currentBet * 2;
  }

  if (deck.length < doShuffle) {
    newDeck = shuffle(deckNum); // TODO: we are failing to call the deck in this function I think
  } else {
    newDeck = deck;
  }

  dispatch({
    type: "CLEANUP_BLACKJACK",
    payload: {
      deck: newDeck,
      wallet: wallet,
    },
  });
};

export const moveToComplete = () => async (dispatch: any) => {
  dispatch({
    type: "MOVE_TO_COMPLETE_BLACKJACK",
  });
};

export const dealOpeningCards = (deck: Card[], players: Player[]) => async (
  dispatch: any
) => {
  let hand1: Card[] = [];
  let hand2: Card[] = [];

  let newDeck: Card[] = [...deck];

  let hands = [hand1, hand2];

  let delay = 0.2;
  for (let i = 4; i > 0; i--) {
    // take new card off top of deck
    let card: Card = newDeck.slice(-1)[0];
    newDeck = newDeck.slice(0, -1);

    delay += 0.4;
    //loop through 4 cards and deal them
    if (i === 1) {
      card = { ...card, isFaceUp: false, delay };
    } else {
      card = { ...card, delay };
    }
    hands[i % 2].push(card);
  }
  Promise.all([
    dispatch({
      type: "DEAL_OPENING_CARDS_BLACKJACK",
      payload: {
        deck: newDeck,
        hand1: hands[0],
        hand2: hands[1],
      },
    }),
  ])
    .then(() => {
      dispatch(calculateScore(hands[0], players[0]));
    })
    .then(() => {
      dispatch(calculateScore(hands[1], players[1]));
    });
};

export const cashOut = (userId: string, wallet: number) => async (
  dispatch: any
) => {
  dispatch({
    type: "CASH_OUT",
  });

  const userData = db
    .collection("users")
    .doc(userId)
    .collection(CurrentGame.BLACKJACK)
    .doc("BLACKJACKInfo");

  userData
    .get()
    .then((res) => {
      // @ts-ignore
      const newBank = res.data().bank + wallet;
      userData.update({ bank: newBank }).then(() => {
        dispatch({
          type: "UPDATE_BANK",
          payload: newBank,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const calculateScore = (hand: Card[], player: Player) => async (
  dispatch: any
) => {
  const playerId = findPlayerId(player);
  let score: number = 0;
  const newHand = hand.filter((card) => card.isFaceUp);
  newHand
    .filter((card) => card.value !== 11)
    .forEach((card) => {
      score += card.value;
    });

  newHand
    .filter((card) => card.value === 11)
    .forEach((card) => {
      // @ts-ignore
      score += score + card.value > 21 ? card.secondaryValue : card.value;
    });

  dispatch({
    type: "CALCULATE_SCORE_BLACKJACK",
    payload: {
      playerId: playerId,
      score: score,
    },
  });
};

export const dealCard = (deck: Card[], player: Player) => async (
  dispatch: any
) => {
  const playerId = findPlayerId(player);
  let card = deck.slice(-1)[0];

  Promise.all([
    dispatch({
      type: "DEAL_CARD_BLACKJACK",
      payload: {
        playerId: playerId,
        deck: deck.slice(0, -1),
        hand: [...player.hand, card],
        player: player.name,
      },
    }),
  ]).then(() => {
    dispatch(calculateScore([...player.hand, card], player));
  });
};

function shuffle(numberOfDecks: number): Card[] {
  let blackJackDeck: Card[] = [];
  for (let i = 0; i < numberOfDecks; i++) {
    const shuffledDeck = _.shuffle(deck);
    shuffledDeck.forEach((card) => {
      blackJackDeck.push(card);
    });
  }
  return blackJackDeck;
}

function findPlayerId(player: Player) {
  let playerId;
  if (player.name === "Dealer") {
    playerId = 1;
  } else {
    playerId = 0;
  }
  return playerId;
}
