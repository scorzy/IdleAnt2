import { getGame } from "../../app.component.spec";
import { Materials } from "./materials";

describe("Materials", () => {
  it("should create an instance", () => {
    const game = getGame();
    expect(new Materials(game)).toBeTruthy();
  });
});
