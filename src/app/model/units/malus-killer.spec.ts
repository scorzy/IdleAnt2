import { getGame } from "../../app.component.spec";
import { MalusKiller } from "./malus-killer";

describe("MalusKiller", () => {
  const game = getGame();
  it("should create an instance", () => {
    expect(new MalusKiller(game)).toBeTruthy();
  });
});
