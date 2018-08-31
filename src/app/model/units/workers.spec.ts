import { getGame } from "../../app.component.spec";
import { Workers } from "./workers";

describe("Worker2", () => {
  it("should create an instance", () => {
    const game = getGame();
    expect(new Workers(game)).toBeTruthy();
  });
});
