import { AutoBuy } from "./auto-buy";
import { Action } from "../action";

describe("AutoBuy", () => {
  it("should create an instance", () => {
    expect(new AutoBuy(new Action("", "", "", []))).toBeTruthy();
  });
});
