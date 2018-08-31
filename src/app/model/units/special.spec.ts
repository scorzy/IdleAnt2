import { getGame } from "../../app.component.spec";
import { Special } from "./special";

describe("Special", () => {
  it("should create an instance", () => {
    const game = getGame();
    expect(new Special(game)).toBeTruthy();
  });
});
