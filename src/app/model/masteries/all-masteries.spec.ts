import { EventEmitter } from "@angular/core";
import { Game } from "../game";
import { AllMasteries } from "./all-masteries";

describe("AllMasteries", () => {
  it("should create an instance", () => {
    expect(
      new AllMasteries(
        new Game(
          new EventEmitter<number>(),
          new EventEmitter<string>(),
          new EventEmitter<number>(),
          null
        )
      )
    ).toBeTruthy();
  });
});
