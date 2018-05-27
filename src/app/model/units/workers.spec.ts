import { Workers } from "./workers";
import { GameService } from "../game.service";

describe("Workers", () => {
  it("should create an instance", () => {
    const game = new GameService();
    expect(new Workers(game)).toBeTruthy();
  });
});
