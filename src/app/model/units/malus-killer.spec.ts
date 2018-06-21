import { MalusKiller } from "./malus-killer";
import { Game } from "../game";
import { EventEmitter } from "@angular/core";

describe("MalusKiller", () => {
  const game = new Game(new EventEmitter<number>(), new EventEmitter<string>());
  it("should create an instance", () => {
    expect(new MalusKiller(game)).toBeTruthy();
  });
});
