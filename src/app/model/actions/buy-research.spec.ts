import { EventEmitter } from "@angular/core";
import { Game } from "../game";
import { Researches } from "../units/researches";
import { BuyResearch } from "./buy-research";

describe("BuyResearch", () => {
  it("should create an instance", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>(),
      new EventEmitter<number>(),
      null,
      null,
      null
    );
    expect(
      new BuyResearch(new Researches(new EventEmitter(), game))
    ).toBeTruthy();
  });
});
