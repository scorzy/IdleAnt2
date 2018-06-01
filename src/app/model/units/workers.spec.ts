import { Workers } from "./workers";
import { Game } from "../game";
import { EventEmitter } from "@angular/core";

describe("Workers", () => {
  it("should create an instance", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>()
    );
    expect(new Workers(game)).toBeTruthy();
  });
});
