import { EventEmitter } from "@angular/core";
import { Game } from "../game";
import { Bee } from "./bee";

describe("Bee", () => {
  it("should create an instance", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>(),
      new EventEmitter<number>(),
      null,
      null,
      null
    );
    expect(new Bee(game)).toBeTruthy();
  });
});
