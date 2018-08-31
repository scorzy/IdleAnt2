import { getGame } from "../../app.component.spec";
import { Wasps } from "./wasps";

describe("Wasp", () => {
  it("should create an instance", () => {
    const game = getGame();
    expect(new Wasps(game)).toBeTruthy();
  });
});
