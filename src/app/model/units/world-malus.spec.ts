import { EventEmitter } from "@angular/core";
import { Game } from "../game";
import { WorldMalus } from "./world-malus";

describe("WorldMalus", () => {
  it("should create an instance", () => {
    expect(
      new WorldMalus(
        new Game(
          new EventEmitter<number>(),
          new EventEmitter<string>(),
          new EventEmitter<number>()
        )
      )
    ).toBeTruthy();
  });
});
