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

  describe("Save works", () => {
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

    it("return true", () => {
      expect(ok).toBeTruthy();
    });
    it("equal", () => {
      expect(second.units[0].unlocked).toBeTruthy();
    });
  });
  describe("Save works 2", () => {
    const game = new GameService();
    it("equal", () => {
      expect(game.restore({})).toBeFalsy();
    });
  });

  describe("Simple update", () => {
    const game = new GameService();
    const food = new FullUnit("food", "Food", "Food");
    const farmer = new FullUnit("farmer", "Farmer", "Farmer");
    farmer.quantity = new Decimal(1);
    food.addProductor(farmer, new Decimal(1));
    food.unlocked = true;
    farmer.unlocked = true;
    game.unlockedUnits = [food, farmer];
    game.update(10 * 1e3);
    it("10 food", () => {
      expect(food.quantity.toNumber()).toBe(10);
    });
  });
  describe("Simple update 2", () => {
    const game = new GameService();
    const food = new FullUnit("food", "Food", "Food");
    const farmer = new FullUnit("farmer", "Farmer-", "Farmer");
    const farmer2 = new FullUnit("farmer2", "Farmer2-", "Farmer2");
    const farmer3 = new FullUnit("farmer3", "Farmer3-", "Farmer3");
    farmer.quantity = new Decimal(1);
    farmer2.quantity = new Decimal(1);
    farmer3.quantity = new Decimal(1);
    food.addProductor(farmer, new Decimal(1));
    farmer.addProductor(farmer2, new Decimal(1));
    farmer2.addProductor(farmer3, new Decimal(1));
    food.unlocked = true;
    farmer.unlocked = true;
    farmer2.unlocked = true;
    farmer3.unlocked = true;
    game.unlockedUnits = [food, farmer, farmer2, farmer3];
    game.update(10 * 1e3);
    it("226 food", () => {
      expect(Math.floor(food.quantity.toNumber())).toBe(226);
    });
    it("11 farmer2", () => {
      expect(Math.floor(farmer2.quantity.toNumber())).toBe(11);
    });
  });
  describe("Ending update 2", () => {
    const game = new GameService();
    const food = new FullUnit("food", "Food", "Food");
    const consumer = new FullUnit("consumer", "Consumer-", "Consumer");
    const farmer = new FullUnit("farmer", "Farmer-", "Farmer");
    consumer.quantity = new Decimal(1);
    farmer.quantity = new Decimal(1);
    food.quantity = new Decimal(3);
    food.addProductor(farmer, new Decimal(1));
    food.addProductor(consumer, new Decimal(-2));
    food.unlocked = true;
    farmer.unlocked = true;
    consumer.unlocked = true;
    game.unlockedUnits = [food, consumer, farmer];
    game.update(10 * 1e3);
    it("7 food", () => {
      expect(Math.floor(food.quantity.toNumber())).toBe(7);
    });
    it("consumer stopped", () => {
      expect(consumer.efficiency).toBe(0);
    });
    it("farmer active", () => {
      expect(farmer.efficiency).toBe(100);
    });
  });
});
