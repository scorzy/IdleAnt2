import { EventEmitter } from "@angular/core";
import { FullUnit } from "./full-unit";
import { Game } from "./game";
import { Malus } from "./malus";
import { Price } from "./price";
import { Research } from "./research";
import { World } from "./world";

describe("World", () => {
  it("should create an instance", () => {
    expect(new World()).toBeTruthy();
  });
  it("FindBonus", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>(),
      new EventEmitter<number>()
    );
    const world1 = new World();
    expect(world1.findBonus(game.worldBonus.crystalBonus.id, game).id).toBe(
      game.worldBonus.crystalBonus.id
    );
  });
  it("Save and Load", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>(),
      new EventEmitter<number>()
    );
    const world1 = new World();
    const world2 = new World();

    world1.name = "worldName";
    world1.level = new Decimal(10);

    world1.productionsAll = [[game.worldBonus.foodBonus, new Decimal(2)]];
    world1.productionsBonus = [[game.worldBonus.woodBonus, new Decimal(3)]];
    world1.productionsEfficienty = [
      [game.worldBonus.scienceBonus, new Decimal(4)]
    ];

    world2.restore(world1.getSave(), game);

    expect(world2.name).toBe("worldName");
    expect(world2.level.toNumber()).toBe(10);

    expect(world2.productionsAll[0][0].id).toBe(game.worldBonus.foodBonus.id);
    expect(world2.productionsAll[0][1].toNumber()).toBe(2);

    expect(world2.productionsBonus[0][0].id).toBe(game.worldBonus.woodBonus.id);
    expect(world2.productionsBonus[0][1].toNumber()).toBe(3);

    expect(world2.productionsEfficienty[0][0].id).toBe(
      game.worldBonus.scienceBonus.id
    );
    expect(world2.productionsEfficienty[0][1].toNumber()).toBe(4);
  });
  it("Merge", () => {
    const world1 = new World();
    const world3 = new World();
    const world2 = new World();

    const unit1 = new FullUnit("");
    const unit2 = new FullUnit("");
    const unit3 = new FullUnit("");
    const unit4 = new FullUnit("");
    const unit5 = new FullUnit("");
    const unit6 = new FullUnit("");

    world1.name = "1";
    world2.name = "2";
    world3.name = "3";

    world1.productionsBonus = [
      [unit1, new Decimal(1)],
      [unit2, new Decimal(2)]
    ];
    world2.productionsBonus = [
      [unit2, new Decimal(1)],
      [unit3, new Decimal(2)]
    ];
    world3.productionsBonus = [
      [unit4, new Decimal(1)],
      [unit5, new Decimal(2)]
    ];

    world1.productionsEfficienty = [
      [unit1, new Decimal(1)],
      [unit6, new Decimal(2)]
    ];
    world2.productionsEfficienty = [
      [unit1, new Decimal(1)],
      [unit4, new Decimal(1)],
      [unit3, new Decimal(2)]
    ];
    world3.productionsEfficienty = [
      [unit2, new Decimal(1)],
      [unit5, new Decimal(2)]
    ];

    world1.productionsAll = [[unit1, new Decimal(1)], [unit2, new Decimal(2)]];
    world2.productionsAll = [[unit3, new Decimal(1)], [unit4, new Decimal(2)]];
    world3.productionsAll = [[unit1, new Decimal(1)], [unit6, new Decimal(2)]];

    world1.startingUnit = [[unit1, new Decimal(1)], [unit2, new Decimal(2)]];
    world2.startingUnit = [[unit2, new Decimal(1)], [unit3, new Decimal(2)]];

    world1.winContidions = [new Price(unit1, new Decimal(2))];
    world2.winContidions = [
      new Price(unit1, new Decimal(2)),
      new Price(unit2, new Decimal(2))
    ];

    const merged = World.merge([world1, world2, world3]);

    expect(merged.name).toBe("1 2 3");

    expect(
      merged.productionsBonus.find(u => u[0] === unit1)[1].toNumber()
    ).toBe(1);
    expect(
      merged.productionsBonus.find(u => u[0] === unit2)[1].toNumber()
    ).toBe(3);
    expect(
      merged.productionsBonus.find(u => u[0] === unit3)[1].toNumber()
    ).toBe(2);
    expect(
      merged.productionsBonus.find(u => u[0] === unit4)[1].toNumber()
    ).toBe(1);
    expect(
      merged.productionsBonus.find(u => u[0] === unit5)[1].toNumber()
    ).toBe(2);
    expect(merged.productionsBonus.find(u => u[0] === unit6)).toBeFalsy();

    expect(merged.startingUnlocked.length).toBe(0);

    expect(merged.winContidions.length).toBe(2);
  });
  it("CanTravel", () => {
    const world1 = new World("");
    const unit = new FullUnit("");
    world1.winContidions = [new Price(unit, new Decimal(20))];
    let canTravel = world1.canTravel();
    expect(canTravel).toBeFalsy();
    unit.quantity = new Decimal(20);
    canTravel = world1.canTravel();
    expect(canTravel).toBeTruthy();

    const malus = new Malus("");
    malus.isKilled = false;
    world1.notWinConditions = [malus];
    canTravel = world1.canTravel();
    expect(canTravel).toBeFalsy();
    malus.isKilled = true;
    canTravel = world1.canTravel();
    expect(canTravel).toBeTruthy();
  });
});
