import { Game } from "./game";
import { FullUnit } from "./full-unit";

describe("Game", () => {
  it("should create an instance", () => {
    expect(new Game()).toBeTruthy();
  });
  it("Save works", () => {
    const original = new Game();
    const second = new Game();

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
  it("Save works", () => {
    const game = new Game();
    expect(game.restore({})).toBeFalsy();
  });
});
