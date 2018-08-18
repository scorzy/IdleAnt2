import { EventEmitter } from "@angular/core";
import { Game } from "../game";
import { WarpAction } from "./warp-action";

describe("WarpAction", () => {
  const game = new Game(
    new EventEmitter<number>(),
    new EventEmitter<string>(),
    new EventEmitter<number>(),
    null,
    null,
    null
  );
  it("should create an instance", () => {
    expect(new WarpAction(60, game)).toBeTruthy();
  });
});
