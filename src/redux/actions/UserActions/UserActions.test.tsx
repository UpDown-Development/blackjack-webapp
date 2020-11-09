import { setup } from "../../../setupTests";
import { genericState } from "../../../utils/testData";
import { loginUser, signUpUserEmailAndPassword } from "./userActions";

describe("UserActions Tests", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  xit("should display user loading on login", function () {
    jest.mock("firebase");
    const testObj = setup(genericState);
    // @ts-ignore
    return testObj.store.dispatch(loginUser("Test", "test")).then(() => {
      expect(testObj.store.getActions()[0].type).toEqual("USER_LOADING");
    });
  });
  xit("should display user loading on signup", function () {
    jest.mock("firebase");
    const testObj = setup(genericState);
    return (
      testObj.store
        // @ts-ignore
        .dispatch(signUpUserEmailAndPassword("Test", "test"))
        .then(() => {
          expect(testObj.store.getActions()[0].type).toEqual("USER_LOADING");
        })
    );
  });
});
