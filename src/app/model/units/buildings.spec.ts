import { getGame } from "../../app.component.spec";
import { Buildings } from "./buildings";

describe("Buildings", () => {
  it("should create an instance", () => {
    const game = getGame();
    expect(new Buildings(game)).toBeTruthy();
  });
});
