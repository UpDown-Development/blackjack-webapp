import { loginUser } from "./UserActions";
import { db, myFirebase } from "../../../utils/firebaseConfig";
import { setup } from "../../../setupTests";
import { genericState } from "../../../utils/testData";

describe("User Actions", () => {
  it("should log in a user with email successfully", () => {
    jest.mock("firebase");
    const spy = spyOn(
      myFirebase.auth(),
      "signInWithEmailAndPassword"
    ).and.returnValue(Promise.resolve({ user: { user: { id: "143d" } } }));
    const testObj = setup(genericState);
    return (
      testObj.store
        // @ts-ignore
        .dispatch(loginUser("test@test.com", "123345"))
        .then(() => {
          expect(spy).toHaveBeenCalled();
          expect(testObj.store.getActions()[0].type).toEqual("USER_LOADING");
          expect(testObj.store.getActions()[1].type).toEqual(
            "USER_LOGIN_SUCCESS"
          );
          expect(testObj.store.getActions()[2].type).toEqual(
            "USER_LOGIN_ERROR"
          );
        })
    );
  });
});
