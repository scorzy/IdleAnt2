import { Materials } from "./materials";
import { Game } from "../game";
import { EventEmitter } from "@angular/core";

describe("Materials", () => {
  it("should create an instance", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>()
    );
    expect(new Materials(game)).toBeTruthy();
  });
});
