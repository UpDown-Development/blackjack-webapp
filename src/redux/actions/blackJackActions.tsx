import { deck } from "../../utils/blackJackDeck";
import { Card, Player} from "../../models/generic";
import _ from "lodash";

export interface BlackJackAction {
  type: string;
  payload: any;
}

export const initBlackJack = (numberOfDecks: number = 1, wallet: number) => async (
    dispatch: any
) => {
  const dealer: Player = {
    currentBet: 0,
    hand: [],
    isTurn: false,
    wallet: 9999999999,
    name: 'Dealer'
  }

  const player: Player = {
    currentBet: 0,
    hand: [],
    isTurn: true,
    wallet: wallet,
    name: 'Player'
  }

  const players: Player[] = [player, dealer]

  const blackJackDeck = shuffle(numberOfDecks);

  dispatch({
    type: "INIT_BLACKJACK",
    payload: {
      deck: blackJackDeck,
      players
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
      wallet: wallet-bet
    }
  });}

export const endPlaying = () => async (
    dispatch: any
) => {


  dispatch({
    type: "MOVE_TO_DEALER_PLAYING_BLACKJACK",

  });}


export const dealOpeningCards = (deck: Card[]) => async (
    dispatch: any
) => {
  let hand1: Card[] = []
  let hand2: Card[] = []

  let newDeck: Card[] = [...deck]

  let hands = [hand1, hand2]

  for (let i = deck.length; i > deck.length-4; i--) {
    let card: Card = newDeck.slice(-1)[0];
    newDeck = newDeck.slice(1, -1)

    if (i === deck.length-3) {
      card = {...deck[i-1], isFaceUp:false}
    } else {
      card = deck[i-1]
    }
    hands[i % 2].push(card)
  }

  dispatch({
    type: "DEAL_OPENING_CARDS_BLACKJACK",
    payload: {
      deck: newDeck,
      hand1: hands[0],
      hand2: hands[1]
    }
  });}

export const dealCard = (deck: Card[], player: Player) => async (
    dispatch: any
) => {

  let card = deck.slice(-1)[0]

  dispatch({
    type: "DEAL_CARD_BLACKJACK",
    payload: {
      deck: deck.slice(1, -1),
      hand: [...player.hand, card],
      player: player.name
    }
  });}

function shuffle(numberOfDecks: number): Card[] {
  let blackJackDeck: Card[] = [];
  for (let i = 0; i < numberOfDecks; i++) {
    const newDeck = deck;
    const shuffledDeck = _.shuffle(newDeck);
    shuffledDeck.forEach((card) => {
      blackJackDeck.push(card);
    });
  }
  return blackJackDeck;
}
