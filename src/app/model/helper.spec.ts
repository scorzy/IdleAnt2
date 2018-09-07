import { getGame } from "../app.component.spec";
import { Helper } from "./helper";

describe("Helper", () => {
  it("should create an instance", () => {
    expect(new Helper("id", 0.1, getGame())).toBeTruthy();
  });
});
