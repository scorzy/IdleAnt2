import { EventEmitter } from "@angular/core";
import { getGame } from "../../app.component.spec";
import { Researches } from "../units/researches";
import { BuyResearch } from "./buy-research";

describe("BuyResearch", () => {
  it("should create an instance", () => {
    const game = getGame();
    expect(
      new BuyResearch(new Researches(new EventEmitter(), game))
    ).toBeTruthy();
  });
});
