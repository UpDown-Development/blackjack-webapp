import { db, myFirebase } from "../../../utils/firebaseConfig";
import { CurrentGame } from "../../../models/generic";
import firebase from "firebase";

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
      db.collection("users")
        .doc(user.user?.uid)
        .get()
        .then((res) => {
          dispatch({
            type: "LOAD_NET_WORTH",
            payload: {
              // @ts-ignore
              netWorth: res.data().netWorth,
            },
          });
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

export const signupOAuth = (provider: string) => async (dispatch: any) => {
  if (provider === "GOOGLE") {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.addScope(
      "https://www.googleapis.com/auth/contacts.readonly"
    );
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((user) => {
        dispatch({
          type: "USER_SIGNUP_SUCCESS",
          payload: user,
        });

        db.collection("users")
          // @ts-ignore
          .doc(`/${user.user.uid}`)
          .set({
            netWorth: 10000,
          })
          .then(() => {
            dispatch({
              type: "UPDATE_NET_WORTH",
              payload: 10000,
            });
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
  }
  if (provider === "FACEBOOK") {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((user) => {
        dispatch({
          type: "USER_SIGNUP_SUCCESS",
          payload: user,
        });

        db.collection("users")
          // @ts-ignore
          .doc(`/${user.user.uid}`)
          .set({
            netWorth: 10000,
          })
          .then(() => {
            dispatch({
              type: "UPDATE_NET_WORTH",
              payload: 10000,
            });
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
  }
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
        .set({
          netWorth: 10000,
        })
        .then(() => {
          dispatch({
            type: "UPDATE_NET_WORTH",
            payload: 10000,
          });
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