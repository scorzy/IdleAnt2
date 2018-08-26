import { EventEmitter } from "@angular/core";
import { Game } from "../game";
import { Wasps } from "./wasps";

describe("Wasp", () => {
  it("should create an instance", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>(),
      new EventEmitter<number>(),
      null,
      null,
      null
    );
    expect(new Wasps(game)).toBeTruthy();
  });
});
