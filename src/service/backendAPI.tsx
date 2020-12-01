import { db } from "../utils/firebaseConfig";
import { BlackJack, CurrentGame, PlayerInfo } from "../models/generic";

export const updateNetWorth = async (userId: string, wallet: number) => {
  const userData = db.collection("users").doc(userId);

  await userData.get().then((res) => {
    // @ts-ignore
    const newBank = res.data().netWorth - wallet;
    userData
      .update({ netWorth: newBank })
      .then(() => {
        return newBank;
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const createGameHistory = async (
  userId: string,
  gamesPlayed: number,
  wallet: number
) => {
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
      return gamesPlayed;
    });
};

export const createHandHistory = async (
  gameState: BlackJack,
  info: PlayerInfo
) => {
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
