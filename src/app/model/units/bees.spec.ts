import { getGame } from "../../app.component.spec";
import { Bees } from "./bees";

describe("Bees", () => {
  it("should create an instance", () => {
    const game = getGame();
    expect(new Bees(game)).toBeTruthy();
  });
});
