import { Workers } from "./workers";
import { Game } from "../game";
import { EventEmitter } from "@angular/core";
import { WorldBonus } from "./world-bonus";

describe("WorldBonus", () => {
  it("should create an instance", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>()
    );
    expect(new WorldBonus()).toBeTruthy();
  });
});
