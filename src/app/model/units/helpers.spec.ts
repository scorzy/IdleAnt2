import { getGame } from "../../app.component.spec";
import { Helpers } from "./helpers";

describe("Helpers", () => {
  it("should create an instance", () => {
    const game = getGame();
    expect(new Helpers(game)).toBeTruthy();
  });
});
