import { EventEmitter } from "@angular/core";
import { Game } from "../game";
import { Materials } from "./materials";

describe("Materials", () => {
  it("should create an instance", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>(),
      new EventEmitter<number>(),
      null,
      null,
      null
    );
    expect(new Materials(game)).toBeTruthy();
  });
});
