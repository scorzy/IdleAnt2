import { World } from "./world";
import { Game } from "./game";
import { EventEmitter } from "@angular/core";

describe("World", () => {
  it("should create an instance", () => {
    expect(new World()).toBeTruthy();
  });
  it("FindBonus", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>()
    );
    const world1 = new World();
    expect(world1.findBonus(game.worldBonus.crystalBonus.id, game).id).toBe(
      game.worldBonus.crystalBonus.id
    );
  });
  it("Save and Load", () => {
    const game = new Game(
      new EventEmitter<number>(),
      new EventEmitter<string>()
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
});
