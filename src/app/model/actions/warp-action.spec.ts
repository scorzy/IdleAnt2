import { getGame } from "../../app.component.spec";
import { WarpAction } from "./warp-action";

describe("WarpAction", () => {
  const game = getGame();
  it("should create an instance", () => {
    expect(new WarpAction(60, game)).toBeTruthy();
  });
});
