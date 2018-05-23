import { TestBed, inject } from "@angular/core/testing";

import { GameService } from "./game.service";
import { FullUnit } from "./full-unit";

describe("GameService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
    });
  });

  it(
    "should be created",
    inject([GameService], (service: GameService) => {
      expect(service).toBeTruthy();
    })
  );
  it("Save works", () => {
    const original = new GameService();
    const second = new GameService();

    original.units = [
      new FullUnit("id1", "name1", "desc", new Decimal(10)),
      new FullUnit("id2", "name2", "desc", new Decimal(10))
    ];
    second.units = [
      new FullUnit("id1", "name1", "desc", new Decimal(10)),
      new FullUnit("id2", "name2", "desc", new Decimal(10))
    ];

    original.units[0].unlocked = true;

    const ok = second.restore(original.getSave());

    expect(ok).toBeTruthy();
    expect(JSON.stringify(original)).toBe(JSON.stringify(second));
  });
  it("Save works 2", () => {
    const game = new GameService();
    expect(game.restore({})).toBeFalsy();
  });
});
