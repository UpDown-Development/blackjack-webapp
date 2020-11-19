import { deck } from "../../../utils/blackJackDeck";
import {
  BlackJack,
  Card,
  CurrentGame,
  HandHistory,
  Player,
  PlayerInfo,
} from "../../../models/generic";
import _ from "lodash";
import { db } from "../../../utils/firebaseConfig";
import { splitDeck } from "../../../utils/testData";

export interface BlackJackAction {
  type: string;
  payload?: any;
}

export const initBlackJack = (
  userId: string,
  numberOfDecks: number = 2,
  wallet: number
) => async (dispatch: any) => {
  const dealer: Player = {
    currentBet: 0,
    hand: [],
    secondHand: [],
    wallet: 9999999999,
    name: "Dealer",
    score: 0,
  };
  const player: Player = {
    currentBet: 0,
    hand: [],
    secondHand: [],
    wallet: wallet,
    name: "Player",
    score: 0,
  };

  const players: Player[] = [player, dealer];

  // const blackJackDeck = shuffle(numberOfDecks);
  // const blackJackDeck = loadedDeck;
  //const blackJackDeck = insuranceDeck;
  const blackJackDeck = splitDeck;

  dispatch({
    type: "INIT_BLACKJACK",
    payload: {
      userId: userId,
      deck: blackJackDeck,
      players,
      numberOfDecks,
      wallet,
    },
  });

  const userData = db.collection("users").doc(userId);

  await userData
    .get()
    .then((res) => {
      // @ts-ignore
      const newBank = res.data().netWorth - wallet;
      userData.update({ netWorth: newBank }).then(() => {
        dispatch({
          type: "UPDATE_NET_WORTH",
          payload: newBank,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });

  let gamesPlayed = 1;
  await db
    .collection("users")
    .doc(userId)
    .collection(CurrentGame.BLACKJACK)
    .get()
    .then((res) => {
      res.docs.forEach(() => {
        gamesPlayed++;
      });
      db.collection("users")
        .doc(userId)
        .collection(CurrentGame.BLACKJACK)
        .doc(gamesPlayed.toString())
        .set({
          currencyDifference: 0,
          currentBet: 0,
          currentGamesPlayed: 0,
          currentHandsLost: 0,
          currentHandsWon: 0,
          history: [],
          wallet: wallet,
          startingWallet: wallet,
          currentBlackjacks: 0,
        });
      dispatch({
        type: "CURRENT_GAME_NUMBER",
        payload: gamesPlayed,
      });
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

export const cleanUp = (
  state: number,
  gameState: BlackJack,
  cashout: boolean = false,
  values?: any
) => async (dispatch: any) => {
  const player = gameState.players[0];
  const deck = gameState.deck;
  const deckNum = gameState.numberOfDecks;

  const gotBlackjack = () => {
    let gotIt = false;
    if (player.score === 21 && player.hand.length === 2) {
      gotIt = true;
    }
    return gotIt ? 1 : 0;
  };

  const newHistory: HandHistory = {
    result: state,
    playerHand: gameState.players[0].hand,
    dealerHand: gameState.players[1].hand,
  };

  const allHistory: HandHistory[] = [...gameState.playerInfo.history];

  allHistory.push(newHistory);

  const info: PlayerInfo = {
    currencyDifference: gameState.playerInfo.currencyDifference,
    currentHandsWon: gameState.playerInfo.currentHandsWon,
    currentHandsLost: gameState.playerInfo.currentHandsLost,
    currentGamesPlayed: gameState.playerInfo.currentGamesPlayed + 1,
    // @ts-ignore
    currentBlackjacks: gameState.playerInfo.currentBlackjacks + gotBlackjack(),
    currentBet: 0,
    wallet: 0,
    startingWallet: gameState.playerInfo.startingWallet,
    history: allHistory,
  };

  console.log("state: ", state);

  let wallet;
  if (state === -1) {
    wallet = player.wallet;
    info.currentHandsLost = gameState.playerInfo.currentHandsLost + 1;
  } else if (state === 0) {
    wallet = player.wallet + player.currentBet;
  } else if (state === 1) {
    wallet = player.wallet + player.currentBet * 2;
    info.currentHandsWon = gameState.playerInfo.currentHandsWon + 1;
  } else {
    console.log("wallet pre-award: ", player.wallet);
    wallet = player.wallet + player.currentBet * 2.5;
    console.log("wallet post-award: ", wallet);
    info.currentHandsWon = gameState.playerInfo.currentHandsWon + 1;
  }

  if (gameState.insurance) {
    if (
      gameState.players[1].score === 21 &&
      gameState.players[1].hand.length === 2
    ) {
      wallet = wallet + player.currentBet;
    }
  }

  info.wallet = wallet;
  info.currencyDifference = info.wallet - gameState.playerInfo.startingWallet;

  const doShuffle = _.random(15, 30, false);
  let newDeck: Card[];
  if (deck.length < doShuffle) {
    newDeck = shuffle(deckNum);
  } else {
    newDeck = deck;
  }

  await dispatch({
    type: "CLEANUP_BLACKJACK",
    payload: {
      info: info,
      deck: newDeck,
      wallet: wallet,
    },
  });

  if (cashout) {
    dispatch(cashOut(gameState.userId, gameState.players[0].wallet));
  }
  if (values) {
    dispatch(placeBet(values.bet, gameState.players[0].wallet));
  }

  await db
    .collection("users")
    .doc(gameState.userId)
    .collection(CurrentGame.BLACKJACK)
    .doc(gameState.currentGame.toString())
    .set(info)
    .catch((e) => {
      console.log(e);
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

export const doubleDown = (
  currentBet: number,
  wallet: number,
  player: Player,
  deck: Card[]
) => async (dispatch: any) => {
  dispatch({
    type: "DOUBLE_DOWN",
    payload: {
      currentBet: currentBet * 2,
      wallet: wallet - currentBet,
    },
  });

  dispatch(dealCard(deck, player));
};

export const split = (player: Player, deck: Card[]) => async (
  dispatch: any
) => {
  let newPlayer = player;
  let newDeck = deck;

  dispatch({
    type: "SPLIT",

    payload: {
      player: newPlayer,
      deck: newDeck,
    },
  });
};

export const insure = (currentBet: number, wallet: number) => async (
  dispatch: any
) => {
  let newWallet: number;
  newWallet = wallet - currentBet / 2.0;

  dispatch({
    type: "INSURE",
    payload: {
      wallet: newWallet,
    },
  });
};

export const cashOut = (userId: string, wallet: number) => async (
  dispatch: any
) => {
  dispatch({
    type: "CASH_OUT",
  });

  const userData = db.collection("users").doc(userId);

  userData
    .get()
    .then((res) => {
      // @ts-ignore
      const newBank = res.data().netWorth + wallet;
      userData.update({ netWorth: newBank }).then(() => {
        dispatch({
          type: "UPDATE_NET_WORTH",
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
