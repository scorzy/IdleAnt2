import { EventEmitter } from "@angular/core";
import { Game } from "../game";
import { MalusKiller } from "./malus-killer";

describe("MalusKiller", () => {
  const game = new Game(
    new EventEmitter<number>(),
    new EventEmitter<string>(),
    new EventEmitter<number>()
  );
  it("should create an instance", () => {
    expect(new MalusKiller(game)).toBeTruthy();
  });
});
