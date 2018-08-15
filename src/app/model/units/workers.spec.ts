import { EventEmitter } from "@angular/core";
import { Game } from "../game";
import { Workers } from "./workers";

describe("Worker2", () => {
  it("should create an instance", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>(),
      new EventEmitter<number>()
    );
    expect(new Workers(game)).toBeTruthy();
  });
});
