import { db, myFirebase } from "../../../utils/firebaseConfig";
import { CurrentGame, Data } from "../../../models/generic";

export interface UserAction {
  type: string;
  payload?: any;
}

export const loginUser = (email: string, password: string) => async (
  dispatch: any
) => {
  dispatch({
    type: "USER_LOADING",
  });

  await myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: user,
      });
    })
    .catch((err) => {
      dispatch({
        type: "USER_LOGIN_ERROR",
        payload: err,
      });
    });
};

export const loadGameData = (userid: string, currentGame: CurrentGame) => (
  dispatch: any
) => {
  console.log(currentGame);
  db.collection("users")
    .doc(userid)
    .collection(currentGame)
    .doc(`${currentGame}Info`)
    .get()
    .then((res) => {
      dispatch({
        type: "LOAD_BLACKJACK_DATA",
        payload: {
          data: res.data(),
          userId: userid,
        },
      });
    });
};

export const signUpUserEmailAndPassword = (
  email: string,
  password: string
) => async (dispatch: any) => {
  dispatch({
    type: "USER_LOADING",
  });

  myFirebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({
        type: "USER_SIGNUP_SUCCESS",
        payload: user,
      });

      db.collection("users")
        // @ts-ignore
        .doc(`/${user.user.uid}`)
        .collection("BLACKJACK")
        .doc("BLACKJACKInfo")
        .set({
          netWorth: 10000,
          totalCurrencyWon: 0,
          blackjacks: 0,
          gamesPlayed: 0,
          handsLost: 0,
          handsWon: 0,
        } as Data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      dispatch({
        type: "USER_SIGNUP_ERROR",
        payload: err,
      });
    });
};
