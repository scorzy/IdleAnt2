import { Materials } from "./materials";
import { Game } from "../game";

describe("Materials", () => {
  it("should create an instance", () => {
    const game = new Game();
    expect(new Materials(game)).toBeTruthy();
  });
});
