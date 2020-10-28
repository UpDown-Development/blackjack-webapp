import { myFirebase } from "../../../utils/firebaseConfig";

export interface UserAction {
  type: string;
  payload?: object;
}

export const loginUser = (email: string, password: string) => async (
  dispatch: any
) => {
  dispatch({
    type: "USER_LOADING",
  });

  myFirebase
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
    })
    .catch((err) => {
      dispatch({
        type: "USER_SIGNUP_ERROR",
        payload: err,
      });
    });
};
