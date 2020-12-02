import { db, myFirebase } from "../../../utils/firebaseConfig";
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
      return db
        .collection("users")
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

export const oAuth = (provider: string, isSignup: boolean) => async (
  dispatch: any
) => {
  if (provider === "GOOGLE") {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.addScope(
      "https://www.googleapis.com/auth/contacts.readonly"
    );
    await firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((user) => {
        dispatch({
          type: "USER_SIGNUP_SUCCESS",
          payload: user,
        });
        if (isSignup) {
          return (
            db
              .collection("users")
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
              })
          );
        } else {
          return db
            .collection("users")
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
        }
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
    await firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((user) => {
        dispatch({
          type: "USER_SIGNUP_SUCCESS",
          payload: user,
        });
        if (isSignup) {
          return (
            db
              .collection("users")
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
              })
          );
        } else {
          return db
            .collection("users")
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
        }
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

  await myFirebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (user) => {
      dispatch({
        type: "USER_SIGNUP_SUCCESS",
        payload: user,
      });

      return await db
        .collection("users")
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
          dispatch({
            type: "USER_SIGNUP_ERROR",
            payload: err,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: "USER_SIGNUP_ERROR",
        payload: err,
      });
    });
};
