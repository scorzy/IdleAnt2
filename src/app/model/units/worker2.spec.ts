import { Worker2 } from "./worker2";
import { Game } from "../game";
import { EventEmitter } from "@angular/core";

describe("Worker2", () => {
  it("should create an instance", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>()
    );
    expect(new Worker2(game)).toBeTruthy();
  });
});
