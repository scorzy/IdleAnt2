import { WarpAction } from "./warp-action";
import { Game } from "../game";
import { EventEmitter } from "@angular/core";

describe("WarpAction", () => {
  const game = new Game(new EventEmitter<number>(), new EventEmitter<string>());
  it("should create an instance", () => {
    expect(new WarpAction(60, game)).toBeTruthy();
  });
});
