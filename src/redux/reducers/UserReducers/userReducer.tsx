import produce from "immer";
import firebase from "firebase";
import { GameUser } from "../../../models/generic";

export const defaultState: GameUser = {
  currentCardBackground: "",
  data: undefined,
  loading: false,
  nickname: "",
  user: undefined,
  username: "",
};
