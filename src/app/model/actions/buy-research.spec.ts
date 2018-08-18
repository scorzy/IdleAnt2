import { EventEmitter } from "@angular/core";
import { Researches } from "../units/researches";
import { BuyResearch } from "./buy-research";

describe("BuyResearch", () => {
  it("should create an instance", () => {
    expect(new BuyResearch(new Researches(new EventEmitter()))).toBeTruthy();
  });
});
