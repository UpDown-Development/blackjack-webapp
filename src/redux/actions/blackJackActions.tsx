import { deck } from "../../utils/blackJackDeck";
import { BlackJack, Card, Player } from "../../models/generic";
import _ from "lodash";

export interface BlackJackAction {
  type: string;
  payload: any;
}

export const initBlackJack = (
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

  const players: Player[] = [player, dealer];

  const blackJackDeck = shuffle(numberOfDecks);

  dispatch({
    type: "INIT_BLACKJACK",
    payload: {
      deck: blackJackDeck,
      players,
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

  let newDeck: Card[];
  let wallet;

  if (state === -1) {
    wallet = player.wallet;
  } else if (state === 0) {
    wallet = player.wallet + player.currentBet;
  } else if (state === 1) {
    wallet = player.wallet + player.currentBet * 2;
  }

  if (deck.length < (52 * deckNum) / 5) {
    newDeck = shuffle(deckNum); // TODO: we are failing to call the deck in this function I think
  } else {
    newDeck = deck;
  }

  dispatch({
    type: "MOVE_TO_CLEANUP_BLACKJACK",
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

  for (let i = deck.length; i > deck.length - 4; i--) {
    let card: Card = newDeck.slice(-1)[0];
    newDeck = newDeck.slice(1, -1);

    if (i === deck.length - 3) {
      card = { ...deck[i - 1], isFaceUp: false };
    } else {
      card = deck[i - 1];
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
        deck: deck.slice(1, -1),
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
