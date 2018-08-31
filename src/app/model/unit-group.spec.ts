import { getGame } from "../app.component.spec";
import { UnitGroup } from "./unit-group";

describe("UnitGroup", () => {
  const game = getGame();
  it("should create an instance", () => {
    expect(new UnitGroup("", game)).toBeTruthy();
  });
});
