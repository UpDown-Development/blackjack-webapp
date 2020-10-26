import { deck } from "../../utils/blackJackDeck";
import {BlackJack, Card, Player} from "../../models/generic";
import _ from "lodash";

export interface BlackJackAction {
  type: string;
  payload: BlackJack;
}

export const initBlackJack = (numberOfDecks: number = 1, wallet: number) => async (
  dispatch: any
) => {
  const dealer: Player = {
    currentBet: 0,
    hand: [],
    isTurn: false,
    wallet: 9999999999
  }

  const player: Player = {
    currentBet: 0,
    hand: [],
    isTurn: true,
    wallet: wallet
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
