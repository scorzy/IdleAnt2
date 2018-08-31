import { getGame } from "../../app.component.spec";
import { Engineers } from "./engineers";

describe("Engineers", () => {
  it("should create an instance", () => {
    const game = getGame();
    expect(new Engineers(game)).toBeTruthy();
  });
});
