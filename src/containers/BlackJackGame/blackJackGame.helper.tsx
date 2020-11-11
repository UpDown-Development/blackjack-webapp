import React from "react";
import {
  dealCard,
  dealOpeningCards,
  endPlaying,
  moveToComplete,
} from "../../redux/actions/BlackJackActions/BlackJackActions";
import { BlackJackPhase, Card, ColorEnum, Player } from "../../models/generic";
import Toast from "../../components/Toast/Toast";
import { Redirect } from "react-router";

export const dealerAI = (dispatch: any, deck: Card[], dealer: Player) => {
  // @ts-ignore
  if (dealer.score < 17) {
    dispatch(dealCard(deck, dealer));
    return true;
  } else {
    dispatch(moveToComplete());
  }
  return false;
};

export const displayWinMessage = (
  dispatch: any,
  player: Player,
  dealer: Player
) => {
  let winMessage: string = "It's a push";
  let winResult = 0;
  let color = ColorEnum.PUSH;

  if (player.score === 21 && player.hand.length === 2 && dealer.score !== 21) {
    winMessage = "Holy FUCK you got a Blackjack!";
    winResult = 1.5;
    color = ColorEnum.WIN;
  } else if (
    // @ts-ignore
    (player.score > dealer.score && player.score <= 21) ||
    // @ts-ignore
    (player.score <= 21 && dealer.score > 21)
  ) {
    winMessage = "You won!!!";
    winResult = 1;
    color = ColorEnum.WIN;
  } else {
    if (
      // @ts-ignore
      (dealer.score > player.score && dealer.score <= 21) ||
      // @ts-ignore
      (dealer.score <= 21 && player.score > 21)
    ) {
      winMessage = "You lost. Better luck next time...";
      winResult = -1;
      color = ColorEnum.LOSS;
    }
  }

  return { winMessage, state: winResult, color };
};

export const checkScore = (dispatch: any, player: Player, dealer: Player) => {
  // @ts-ignore
  if (player.score >= 21) {
    dispatch(endPlaying(dealer.hand, dealer));
  }
};

export const ConditionalRender = (props: any) => {
  const state = props.state;
  const dispatch = props.dispatch;

  const player = state.players[0];
  const dealer = state.players[1];

  switch (state.phase) {
    case BlackJackPhase.COMPLETE:
      if (player.hand.length !== 0) {
        return (
          <Toast
            open={true}
            color={displayWinMessage(dispatch, player, dealer).color}
            message={displayWinMessage(dispatch, player, dealer).winMessage}
          />
        );
      } else {
        return <></>;
      }
    case BlackJackPhase.CASHOUT:
      return <Redirect to={"/"} />;
    case BlackJackPhase.DEALING:
      dispatch(dealOpeningCards(state.deck, state.players));
      return <></>;
    default:
      return <></>;
  }
};
