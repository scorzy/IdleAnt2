import { Workers } from "./workers";
import { Game } from "../game.service";

describe("Workers", () => {
  it("should create an instance", () => {
    const game = new Game();
    expect(new Workers(game)).toBeTruthy();
  });
});
