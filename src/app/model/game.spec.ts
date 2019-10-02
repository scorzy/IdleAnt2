import uniq from "lodash-es/uniq";
import { getGame } from "../app.component.spec";
import { FullUnit } from "./full-unit";
import { Game } from "./game";
import { World } from "./world";

describe("Game", () => {
  let game: Game;

  beforeEach(() => {
    game = getGame();
    game.ms.toastr = jasmine.createSpyObj("ToastrService", [
      "warning",
      "success",
      "info"
    ]);
  });
  it("should be created", () => {
    expect(getGame()).toBeTruthy();
  });
  it("Save works", () => {
    const original = getGame();
    const second = getGame();

    original.units = [
      new FullUnit("id1", "name1", "desc", new Decimal(10)),
      new FullUnit("id2", "name2", "desc", new Decimal(10))
    ];
    second.units = [
      new FullUnit("id1", "name1", "desc", new Decimal(10)),
      new FullUnit("id2", "name2", "desc", new Decimal(10))
    ];

    original.units[0].unlocked = true;
    original.currentWorld.name = "world name";

    const ok = second.restore(original.getSave());

    expect(ok).toBeTruthy();
    expect(second.units[0].unlocked).toBeTruthy();
    expect(second.currentWorld.name).toBe("world name");
  });
  it("Save works 2", () => {
    expect(game.restore({})).toBeFalsy();
  });
  it("Simple update", () => {
    const food = new FullUnit("food", "Food", "Food");
    const farmer = new FullUnit("farmer", "Farmer", "Farmer");
    farmer.quantity = new Decimal(1);
    food.addProducer(farmer, new Decimal(1));
    food.unlocked = true;
    farmer.unlocked = true;
    game.unlockedUnits = [food, farmer];
    game.update(10 * 1e3);

    expect(food.quantity.toNumber()).toBe(10);
  });
  it("Simple update 2", () => {
    const food = new FullUnit("food", "Food", "Food");
    const farmer = new FullUnit("farmer", "Farmer-", "Farmer");
    const farmer2 = new FullUnit("farmer2", "Farmer2-", "Farmer2");
    const farmer3 = new FullUnit("farmer3", "Farmer3-", "Farmer3");
    farmer.quantity = new Decimal(1);
    farmer2.quantity = new Decimal(1);
    farmer3.quantity = new Decimal(1);
    food.addProducer(farmer, new Decimal(1));
    farmer.addProducer(farmer2, new Decimal(1));
    farmer2.addProducer(farmer3, new Decimal(1));
    food.unlocked = true;
    farmer.unlocked = true;
    farmer2.unlocked = true;
    farmer3.unlocked = true;
    game.unlockedUnits = [food, farmer, farmer2, farmer3];
    game.update(10 * 1e3);

    expect(Math.floor(food.quantity.toNumber())).toBe(226);
    expect(Math.floor(farmer2.quantity.toNumber())).toBe(11);
  });
  it("Ending update 2", () => {
    const food = new FullUnit("food", "Food", "Food");
    const consumer = new FullUnit("consumer", "Consumer-", "Consumer");
    const farmer = new FullUnit("farmer", "Farmer-", "Farmer");
    consumer.quantity = new Decimal(1);
    farmer.quantity = new Decimal(1);
    food.quantity = new Decimal(3);
    food.addProducer(farmer, new Decimal(1));
    food.addProducer(consumer, new Decimal(-2));
    food.unlocked = true;
    farmer.unlocked = true;
    consumer.unlocked = true;
    game.unlockedUnits = [food, consumer, farmer];
    game.update(10 * 1e3);

    expect(Math.floor(food.quantity.toNumber())).toBe(7);
    expect(consumer.efficiency).toBe(0);
    expect(farmer.efficiency).toBe(100);
    // expect(toastr.warning).toHaveBeenCalled();
  });
  it("Unique units ID", () => {
    const ids = game.units.map(u => u.id);
    const original = ids.length;
    const unique = uniq(ids).length;
    expect(original).toBe(unique);
  });
  it("Units names", () => {
    for (const unit of game.units.filter(
      u => u !== game.experience && u !== game.time
    )) {
      // tslint:disable-next-line:no-console
      if (unit.name === "") console.log("Unit without name: " + unit.id);
      expect(unit.name).not.toBe("");
    }
  });
  it("Researches names", () => {
    for (const res of game.researches.researches) {
      // tslint:disable-next-line:no-console
      if (res.name === "") console.log("Research without name: " + res.id);
      expect(res.name).not.toBe("");
    }
  });
  it("Prestige names", () => {
    for (const pre of game.allPrestige.prestigeList) {
      // tslint:disable-next-line:no-console
      if (pre.name === "") console.log("Prestige without name: " + pre.id);
      expect(pre.name).not.toBe("");
    }
  });
  it("Warp", () => {
    spyOn(game, "update");
    spyOn(game.autoBuyManager, "update");
    game.warp(-10);
    expect(game.update).toHaveBeenCalledTimes(0);
    expect(game.autoBuyManager.update).toHaveBeenCalledTimes(0);
    expect(game.ms.toastr.info).toHaveBeenCalledTimes(0);

    game.warp(10);
    expect(game.update).toHaveBeenCalled();
    expect(game.autoBuyManager.update).toHaveBeenCalledTimes(0);
    expect(game.ms.toastr.info).toHaveBeenCalledTimes(0);

    game.ms.options.noWarpNotification = false;
    game.warp(10);
    expect(game.update).toHaveBeenCalled();
    expect(game.autoBuyManager.update).toHaveBeenCalledTimes(0);
    expect(game.ms.toastr.info).toHaveBeenCalled();
  });
  it("goToWorld", () => {
    spyOn(game.stats, "logWorldCompleted");
    spyOn(game, "setStartingStuff");
    spyOn(game, "applyWorldBonus");

    game.materials.food.quantity = new Decimal(1e500);
    game.ants.nest.quantity = new Decimal(1e500);
    game.currentWorld.prestige = new Decimal(23);
    const world = new World("a");
    game.canTravel = false;
    world.prestige = new Decimal(20);
    game.experience.quantity = new Decimal(1);
    game.time.quantity = new Decimal(100);

    game.goToWorld(world);

    expect(game.materials.food.quantity.toNumber()).toBe(100);
    expect(game.experience.quantity.toNumber()).toBe(1);
    expect(game.ants.nest.quantity.toNumber()).toBe(0);
    expect(game.stats.logWorldCompleted).toHaveBeenCalled();
    expect(game.currentWorld).toBe(world);
    expect(game.setStartingStuff).toHaveBeenCalled();
    expect(game.applyWorldBonus).toHaveBeenCalled();
    expect(game.time.quantity.toNumber()).toBe(100);

    game.canTravel = true;
    game.goToWorld(world);
    expect(game.experience.quantity.toNumber()).toBe(21);
  });
  it("No Debug", () => {
    game.restore(game.getSave());
    game.materials.list.filter(m => m !== game.materials.food).forEach(d => {
      expect(d.unlocked).toBeFalsy();
      expect(d.quantity.toNumber()).toBe(0);
    });
  });
});
