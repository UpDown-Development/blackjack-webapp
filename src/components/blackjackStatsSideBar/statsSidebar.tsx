import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { PlayerInfo } from "../../models/generic";
import { Paper } from "@material-ui/core";

const StatsSidebar = () => {
  const stats: PlayerInfo = useSelector(
    (state: RootState) => state.BlackJackReducer.playerInfo,
    shallowEqual
  );
  return (
    <Paper>
      <div>Total Money: {stats.wallet}</div>
      <div>Total Gained/Lost: {stats.currencyDifference}</div>
      <div>Current Bet: {stats.currentBet}</div>
      <div>Games Played: {stats.currentGamesPlayed}</div>
      <div>Hands Won: {stats.currentHandsWon}</div>
      <div>Hands Lost: {stats.currentHandsLost}</div>
      <div>Blackjacks: {stats.currentBlackjacks}</div>
    </Paper>
  );
};

export default StatsSidebar;
