import { EventEmitter } from "@angular/core";
import { Game } from "./game";
import { UnitGroup } from "./unit-group";

describe("UnitGroup", () => {
  const game = new Game(
    new EventEmitter<number>(),
    new EventEmitter<string>(),
    new EventEmitter<number>(),
    null,
    null,
    null
  );
  it("should create an instance", () => {
    expect(new UnitGroup("", game)).toBeTruthy();
  });
});
