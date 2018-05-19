import { Action } from "./action";
import { BaseUnit } from "./baseUnit";
import { Price } from "./price";

describe("Action", () => {
  it("should create an instance", () => {
    expect(new Action("id", "name", "desc")).toBeTruthy();
  });
  describe("Save and Load", () => {
    const origin = new Action("id", "name", "desc");
    const other = new Action("id", "name", "desc");

    const save = origin.getSave();
    const result = other.restore(save);

    it("should return true", () => {
      expect(result).toBeTruthy();
    });
    it("should be equal", () => {
      expect(JSON.stringify(origin)).toEqual(JSON.stringify(other));
    });

    const different = new Action("id2", "name2", "desc2");
    const result2 = different.restore(save);

    it("should return false", () => {
      expect(result2).toBeFalsy();
    });

    origin.complete = true;
    origin.done = true;

    const result3 = other.restore(origin.getSave());
    it("should return true", () => {
      expect(result3).toBeTruthy();
    });
    it("should be equal", () => {
      expect(JSON.stringify(origin)).toEqual(JSON.stringify(other));
    });
  });
  describe("Reload 1", () => {
    const action = new Action("id", "name", "desc");
    const unit1 = new BaseUnit("u1", "name", "desc");
    const unit2 = new BaseUnit("u2", "name", "desc");
    const unit3 = new BaseUnit("u3", "name", "desc");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];
    unit1.quantity = new Decimal(0);
    unit2.quantity = new Decimal(0);
    unit3.quantity = new Decimal(0);
    action.reload();

    it("u1 not buyable", () => {
      expect(action.prices[0].canBuy).toBeFalsy();
    });
    it("u2 not buyable", () => {
      expect(action.prices[1].canBuy).toBeFalsy();
    });
    it("u3 not buyable", () => {
      expect(action.prices[2].canBuy).toBeFalsy();
    });
    it("not buyable", () => {
      expect(action.canBuy).toBeFalsy();
    });
    it("max buy = 0", () => {
      expect(action.maxBuy.toNumber()).toBe(0);
    });
  });
  describe("Reload 2", () => {
    const action = new Action("id", "name", "desc");
    const unit1 = new BaseUnit("u1", "name", "desc");
    const unit2 = new BaseUnit("u2", "name", "desc");
    const unit3 = new BaseUnit("u3", "name", "desc");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];

    unit1.quantity = new Decimal(35);
    unit2.quantity = new Decimal(350);
    unit3.quantity = new Decimal(0);
    action.reload();
    it("still not buyable", () => {
      expect(action.canBuy).toBeFalsy();
    });
    it("max buy still = 0", () => {
      expect(action.maxBuy.toNumber()).toBe(0);
    });
  });
  describe("Reload 3", () => {
    const action = new Action("id", "name", "desc");
    const unit1 = new BaseUnit("u1", "name", "desc");
    const unit2 = new BaseUnit("u2", "name", "desc");
    const unit3 = new BaseUnit("u3", "name", "desc");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];

    unit1.quantity = new Decimal(35);
    unit2.quantity = new Decimal(350);
    unit3.quantity = new Decimal(1e10);
    action.reload();
    it("u1 buyable", () => {
      expect(action.prices[0].canBuy).toBeTruthy();
    });
    it("u2 buyable", () => {
      expect(action.prices[1].canBuy).toBeTruthy();
    });
    it("u3 buyable", () => {
      expect(action.prices[2].canBuy).toBeTruthy();
    });

    it("buyable", () => {
      expect(action.canBuy).toBeTruthy();
    });
    it("max buy = 3", () => {
      expect(action.maxBuy.toNumber()).toBe(3);
    });
  });
  describe("Reload limited", () => {
    const action = new Action("id", "name", "desc");
    const unit1 = new BaseUnit("u1", "name", "desc");
    const unit2 = new BaseUnit("u2", "name", "desc");
    const unit3 = new BaseUnit("u3", "name", "desc");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];

    unit1.quantity = new Decimal(1e500);
    unit2.quantity = new Decimal(1e500);
    unit3.quantity = new Decimal(1e500);
    action.limit = new Decimal(10);
    action.reload();
    it("u1 buyable", () => {
      expect(action.prices[0].canBuy).toBeTruthy();
    });
    it("u2 buyable", () => {
      expect(action.prices[1].canBuy).toBeTruthy();
    });
    it("u3 buyable", () => {
      expect(action.prices[2].canBuy).toBeTruthy();
    });

    it("buyable", () => {
      expect(action.canBuy).toBeTruthy();
    });
    it("max buy = 3", () => {
      expect(action.maxBuy.toNumber()).toBe(10);
    });
  });
  describe("Reload limited 2", () => {
    const action = new Action("id", "name", "desc");
    const unit1 = new BaseUnit("u1", "name", "desc");
    const unit2 = new BaseUnit("u2", "name", "desc");
    const unit3 = new BaseUnit("u3", "name", "desc");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];

    unit1.quantity = new Decimal(1e500);
    unit2.quantity = new Decimal(1e500);
    unit3.quantity = new Decimal(1e500);
    action.limit = new Decimal(10);
    action.quantity = new Decimal(3);
    action.reload();
    it("u1 buyable", () => {
      expect(action.prices[0].canBuy).toBeTruthy();
    });
    it("u2 buyable", () => {
      expect(action.prices[1].canBuy).toBeTruthy();
    });
    it("u3 buyable", () => {
      expect(action.prices[2].canBuy).toBeTruthy();
    });

    it("buyable", () => {
      expect(action.canBuy).toBeTruthy();
    });
    it("max buy = 7", () => {
      expect(action.maxBuy.toNumber()).toBe(7);
    });
  });
  describe("Reload limited 3", () => {
    const action = new Action("id", "name", "desc");
    const unit1 = new BaseUnit("u1", "name", "desc");
    const unit2 = new BaseUnit("u2", "name", "desc");
    const unit3 = new BaseUnit("u3", "name", "desc");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];

    unit1.quantity = new Decimal(1e500);
    unit2.quantity = new Decimal(1e500);
    unit3.quantity = new Decimal(1e500);
    action.limit = new Decimal(10);
    action.quantity = new Decimal(9);
    action.reload();
    it("u1 buyable", () => {
      expect(action.prices[0].canBuy).toBeTruthy();
    });
    it("u2 buyable", () => {
      expect(action.prices[1].canBuy).toBeTruthy();
    });
    it("u3 buyable", () => {
      expect(action.prices[2].canBuy).toBeTruthy();
    });

    it("buyable", () => {
      expect(action.canBuy).toBeTruthy();
    });
    it("max buy = 1", () => {
      expect(action.maxBuy.toNumber()).toBe(1);
    });
  });
  describe("Reload limited 4", () => {
    const action = new Action("id", "name", "desc");
    const unit1 = new BaseUnit("u1", "name", "desc");
    const unit2 = new BaseUnit("u2", "name", "desc");
    const unit3 = new BaseUnit("u3", "name", "desc");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];

    unit1.quantity = new Decimal(1e500);
    unit2.quantity = new Decimal(1e500);
    unit3.quantity = new Decimal(1e500);
    action.limit = new Decimal(10);
    action.quantity = new Decimal(10);
    action.reload();
    it("u1 buyable", () => {
      expect(action.prices[0].canBuy).toBeTruthy();
    });
    it("u2 buyable", () => {
      expect(action.prices[1].canBuy).toBeTruthy();
    });
    it("u3 buyable", () => {
      expect(action.prices[2].canBuy).toBeTruthy();
    });

    it("buyable", () => {
      expect(action.canBuy).toBeFalsy();
    });
    it("max buy = 0", () => {
      expect(action.maxBuy.toNumber()).toBe(0);
    });
  });
  describe("Buy 1", () => {
    const action = new Action("id", "name", "desc");
    const unit1 = new BaseUnit("u1", "name", "desc");
    const unit2 = new BaseUnit("u2", "name", "desc");
    const unit3 = new BaseUnit("u3", "name", "desc");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];

    unit1.quantity = new Decimal(35);
    unit2.quantity = new Decimal(350);
    unit3.quantity = new Decimal(1e10);
    action.reload();
    const ret = action.buy(new Decimal(2));

    it("return true", () => {
      expect(ret).toBeTruthy();
    });
    it("buyable", () => {
      expect(action.canBuy).toBeTruthy();
    });
    it("max buy = 1", () => {
      expect(action.maxBuy.toNumber()).toBe(1);
    });
  });
  describe("Buy 2", () => {
    const action = new Action("id", "name", "desc");
    const unit1 = new BaseUnit("u1", "name", "desc");
    const unit2 = new BaseUnit("u2", "name", "desc");
    const unit3 = new BaseUnit("u3", "name", "desc");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];

    unit1.quantity = new Decimal(8);
    unit2.quantity = new Decimal(350);
    unit3.quantity = new Decimal(1e10);
    action.reload();
    const ret = action.buy(new Decimal(2));

    it("return true", () => {
      expect(ret).toBeFalsy();
    });
    it("buyable", () => {
      expect(action.canBuy).toBeFalsy();
    });
    it("max buy = 0", () => {
      expect(action.maxBuy.toNumber()).toBe(0);
    });
  });
});
