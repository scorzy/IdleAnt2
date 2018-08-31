import { getGame } from "../../app.component.spec";
import { WorldMalus } from "./world-malus";

describe("WorldMalus", () => {
  it("should create an instance", () => {
    expect(new WorldMalus(getGame())).toBeTruthy();
  });
});
