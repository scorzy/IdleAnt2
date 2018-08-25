import { EventEmitter } from "@angular/core";
import { Game } from "../game";
import { Ants } from "./ants";

describe("Ants", () => {
  it("should create an instance", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>(),
      new EventEmitter<number>(),
      null,
      null,
      null
    );
    expect(new Ants(game)).toBeTruthy();
  });
});
