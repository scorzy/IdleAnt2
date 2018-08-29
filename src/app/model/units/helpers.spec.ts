import { EventEmitter } from "@angular/core";
import { Game } from "../game";
import { Helpers } from "./helpers";

describe("Helpers", () => {
  it("should create an instance", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>(),
      new EventEmitter<number>(),
      null,
      null,
      null
    );
    expect(new Helpers(game)).toBeTruthy();
  });
});
