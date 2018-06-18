import { WorldMalus } from "./world-malus";
import { Game } from "../game";
import { EventEmitter } from "@angular/core";

describe("WorldMalus", () => {
  it("should create an instance", () => {
    expect(
      new WorldMalus(
        new Game(new EventEmitter<number>(), new EventEmitter<string>())
      )
    ).toBeTruthy();
  });
});
