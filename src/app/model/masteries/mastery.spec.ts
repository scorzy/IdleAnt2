import { getGame } from "../../app.component.spec";
import { Game } from "../game";
import { World } from "../world";
import { Mastery, MasteryTypes } from "./mastery";

describe("Mastery", () => {
  let game: Game;
  beforeEach(() => {
    game = getGame();
    game.materials.list.forEach(m => {
      m.unlocked = true;
      m.quantity = new Decimal(1e4);
    });
    game.gatherers.list.forEach(m => {
      m.unlocked = true;
    });
    game.advWorkers.list.forEach(m => {
      m.unlocked = true;
    });
    game.buildLists();
  });
  it("should create an instance", () => {
    expect(new Mastery(0, MasteryTypes.MORE_FOLLOWERS)).toBeTruthy();
  });
  it("MORE_FOLLOWERS", () => {
    game.gatherers.student.follower.quantity = new Decimal(1);
    game.advWorkers.farmer.follower.quantity = new Decimal(1);
    game.allMateries.getSum = (type: MasteryTypes) =>
      type === MasteryTypes.MORE_FOLLOWERS ? 1 : 0;
    game.canTravel = true;
    game.goToWorld(new World());

    expect(game.gatherers.student.quantity.toNumber()).toBe(10);
    expect(game.gatherers.student.quantity.toNumber()).toBe(10);
  });
  it("MORE_FOLLOWERS_GA", () => {
    game.gatherers.student.follower.quantity = new Decimal(1);
    game.advWorkers.farmer.follower.quantity = new Decimal(1);
    game.allMateries.getSum = (type: MasteryTypes) =>
      type === MasteryTypes.MORE_FOLLOWERS_GA ? 1 : 0;
    game.canTravel = true;
    game.goToWorld(new World());

    expect(game.gatherers.student.quantity.toNumber()).toBe(20);
    expect(game.advWorkers.farmer.quantity.toNumber()).toBe(5);
  });
  it("MORE_FOLLOWERS_WO", () => {
    game.gatherers.student.follower.quantity = new Decimal(1);
    game.advWorkers.farmer.follower.quantity = new Decimal(1);
    game.allMateries.getSum = (type: MasteryTypes) =>
      type === MasteryTypes.MORE_FOLLOWERS_WO ? 1 : 0;
    game.canTravel = true;
    game.goToWorld(new World());

    expect(game.gatherers.student.quantity.toNumber()).toBe(5);
    expect(game.advWorkers.farmer.quantity.toNumber()).toBe(20);
  });
  it("FOOD_BONUS", () => {
    game.gatherers.drone.quantity = new Decimal(1);
    game.allMateries.getSum = (type: MasteryTypes) =>
      type === MasteryTypes.FOOD_BONUS ? 10 : 0;
    game.allMateries.reloadBonus();
    game.update(1);
    expect(game.materials.food.c.toNumber()).toBe(2);
  });
  it("SCIENCE_BONUS", () => {
    game.gatherers.student.quantity = new Decimal(1);
    game.allMateries.getSum = (type: MasteryTypes) =>
      type === MasteryTypes.SCIENCE_BONUS ? 10 : 0;
    game.allMateries.reloadBonus();
    game.update(1);
    expect(game.materials.science.c.toNumber()).toBe(2);
  });
  it("CRYSTALL_BONUS", () => {
    game.gatherers.geologist.quantity = new Decimal(1);
    game.allMateries.getSum = (type: MasteryTypes) =>
      type === MasteryTypes.CRYSTALL_BONUS ? 10 : 0;
    game.allMateries.reloadBonus();
    game.update(1);
    expect(game.materials.crystal.c.toNumber()).toBe(2);
  });
  it("SOIL_BONUS", () => {
    game.advWorkers.carpenter.quantity = new Decimal(1);
    game.allMateries.getSum = (type: MasteryTypes) =>
      type === MasteryTypes.SOIL_BONUS ? 10 : 0;
    game.allMateries.reloadBonus();
    game.update(1);
    expect(game.materials.soil.c.toNumber()).toBe(40);
  });
  it("HARVEST_BONUS", () => {
    game.gatherers.drone.quantity = new Decimal(1);
    game.allMateries.getSum = (type: MasteryTypes) =>
      type === MasteryTypes.HARVEST_BONUS ? 10 : 0;
    game.allMateries.reloadBonus();
    game.update(1);
    expect(game.materials.food.c.toNumber()).toBe(3);
  });
  it("MATERIAL_GAIN", () => {
    game.gatherers.drone.quantity = new Decimal(1);
    game.allMateries.getSum = (type: MasteryTypes) =>
      type === MasteryTypes.MATERIAL_GAIN ? 10 : 0;
    game.allMateries.reloadBonus();
    game.update(1);
    expect(game.materials.food.c.toNumber()).toBe(2);
  });
  it("", () => {});
});
