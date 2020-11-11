import { configure, mount, ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";

interface SetupResponse {
  wrapper?: ReactWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  > | null;
  store: MockStoreEnhanced<unknown>;
}

configure({ adapter: new Adapter() });

export const setup = (data: any, component?: any): SetupResponse => {
  let resComponent:
    | ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>
    | undefined = undefined;
  let store: MockStoreEnhanced<unknown>;
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  store = mockStore({
    ...data,
  });
  if (component) {
    resComponent = mount(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>
    );
  }

  return {
    wrapper: resComponent,
    store: store,
  };
};

export const failTest = (e: Error) => {
  console.log(e);
  return expect(1).toEqual(2);
};
