import { getGame } from "../../app.component.spec";
import { WorldBonus } from "./world-bonus";

describe("WorldBonus", () => {
  it("should create an instance", () => {
    const game = getGame();
    expect(new WorldBonus()).toBeTruthy();
  });
});
