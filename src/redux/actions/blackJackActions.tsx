import { deck } from "../../utils/blackJackDeck";
import { BlackJack, Card } from "../../models/generic";
import _ from "lodash";

export interface BlackJackAction {
  type: string;
  payload: BlackJack;
}

export const initBlackJack = (numberOfDecks: number) => async (
  dispatch: any
) => {
  const blackJackDeck = shuffle(numberOfDecks);

  dispatch({
    type: "INIT_BLACKJACK",
    payload: {
      deck: blackJackDeck,
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
