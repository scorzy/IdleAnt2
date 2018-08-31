import { getGame } from "../../app.component.spec";
import { Gatherers } from "./gatherers";

describe("Gatherers", () => {
  it("should create an instance", () => {
    const game = getGame();
    expect(new Gatherers(game)).toBeTruthy();
  });
});
