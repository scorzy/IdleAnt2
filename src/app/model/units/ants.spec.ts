import { getGame } from "../../app.component.spec";
import { Ants } from "./ants";

describe("Ants", () => {
  it("should create an instance", () => {
    const game = getGame();
    expect(new Ants(game)).toBeTruthy();
  });
});
