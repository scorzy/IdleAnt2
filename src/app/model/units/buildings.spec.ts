import { EventEmitter } from "@angular/core";
import { Game } from "../game";
import { Buildings } from "./buildings";

describe("Buildings", () => {
  it("should create an instance", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>(),
      new EventEmitter<number>(),
      null,
      null,
      null
    );
    expect(new Buildings(game)).toBeTruthy();
  });
});
