import { EventEmitter } from "@angular/core";
import { Game } from "../game";
import { Special } from "./special";

describe("Special", () => {
  it("should create an instance", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>(),
      new EventEmitter<number>(),
      null,
      null,
      null
    );
    expect(new Special(game)).toBeTruthy();
  });
});
