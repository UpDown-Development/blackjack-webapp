import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

export const wait = (spy: any) =>
  new Promise((resolve) => setTimeout(resolve)).then(() => {
    expect(spy).toHaveBeenCalled();
  });
