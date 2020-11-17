import { loginUser, oAuth, signUpUserEmailAndPassword } from "./UserActions";
import { db, myFirebase } from "../../../utils/firebaseConfig";
import { failTest, setup } from "../../../setupTests";
import { genericState } from "../../../utils/testData";

describe("User Actions", () => {
  it("should log in a user with email successfully", async () => {
    const spy = spyOn(
      myFirebase.auth(),
      "signInWithEmailAndPassword"
    ).and.returnValue(Promise.resolve({ user: { user: { id: "143d" } } }));
    const testObj = setup(genericState);
    testObj.store
      // @ts-ignore
      .dispatch(loginUser("test@test.com", "123345"));
    await Promise.resolve()
      .then(() => {
        expect(spy).toHaveBeenCalled();
        expect(testObj.store.getActions()[0].type).toEqual("USER_LOADING");
        expect(testObj.store.getActions()[1].type).toEqual(
          "USER_LOGIN_SUCCESS"
        );
      })
      .catch((e) => {
        failTest(e);
      });
  });
  it("should try to sign up with no problem", async () => {
    const spy = spyOn(
      myFirebase.auth(),
      "createUserWithEmailAndPassword"
    ).and.returnValue(Promise.resolve({ user: { user: { id: "143d" } } }));
    const testObj = setup(genericState);
    testObj.store
      // @ts-ignore
      .dispatch(signUpUserEmailAndPassword("test@test.com", "123345"));
    await Promise.resolve()
      .then(() => {
        expect(spy).toHaveBeenCalled();
        expect(testObj.store.getActions()[0].type).toEqual("USER_LOADING");
        expect(testObj.store.getActions()[1].type).toEqual(
          "USER_SIGNUP_SUCCESS"
        );
      })
      .catch((e) => {
        failTest(e);
      });
  });
  it("should try to sign up with OAuth(Google)", async () => {
    const spy = spyOn(myFirebase.auth(), "signInWithPopup").and.returnValue(
      Promise.resolve({ user: { user: { id: "143d" } } })
    );
    const testObj = setup(genericState);
    testObj.store
      // @ts-ignore
      .dispatch(oAuth("GOOGLE", true));
    await Promise.resolve()
      .then(() => {
        expect(spy).toHaveBeenCalled();
        expect(testObj.store.getActions()[0].type).toEqual(
          "USER_SIGNUP_SUCCESS"
        );
      })
      .catch((e) => {
        failTest(e);
      });
  });
  it("should try to login with OAuth(GOOGLE)", async () => {
    const spy = spyOn(myFirebase.auth(), "signInWithPopup").and.returnValue(
      Promise.resolve({ user: { user: { id: "143d" } } })
    );
    const testObj = setup(genericState);
    testObj.store
      // @ts-ignore
      .dispatch(oAuth("GOOGLE", false));
    await Promise.resolve()
      .then(() => {
        expect(spy).toHaveBeenCalled();
        expect(testObj.store.getActions()[0].type).toEqual(
          "USER_SIGNUP_SUCCESS"
        );
      })
      .catch((e) => {
        failTest(e);
      });
  });
});
