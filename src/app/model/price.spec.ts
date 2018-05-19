import { BaseUnit } from "./baseUnit";
import { Price } from "./price";

describe("Price", () => {
  it("should create an instance", () => {
    const base = new BaseUnit("id", "base", "desc");
    expect(new Price(base, new Decimal(1))).toBeTruthy();
  });

  describe("reload cannot buy", () => {
    const base = new BaseUnit("id", "base", "desc");
    const price = new Price(base, new Decimal(10), 1.1);
    price.reload(new Decimal(0));

    it("cannot buy", () => {
      expect(price.canBuy).toBeFalsy();
    });
    it("maxBuy = 0", () => {
      expect(price.maxBuy.toNumber()).toBe(0);
    });
  });

  describe("reload cannot buy 2", () => {
    const unit1 = new BaseUnit("u1", "name", "desc");
    unit1.quantity = new Decimal(0);
    const price = new Price(unit1, new Decimal(10), 1.1);
    price.reload(new Decimal(0));

    it("cannot buy", () => {
      expect(price.canBuy).toBeFalsy();
    });
    it("maxBuy = 0", () => {
      expect(price.maxBuy.toNumber()).toBe(0);
    });
  });

  describe("reload can buy", () => {
    const base = new BaseUnit("id", "base", "desc");
    base.quantity = new Decimal(15);
    const price = new Price(base, new Decimal(10), 1.1);
    price.reload(new Decimal(1));

    it("can buy", () => {
      expect(price.canBuy).toBeTruthy();
    });
    it("maxBuy = 1", () => {
      expect(price.maxBuy.toNumber()).toBe(1);
    });
  });

  describe("reload can buy 2", () => {
    const base = new BaseUnit("id", "base", "desc");
    base.quantity = new Decimal(35);
    const price = new Price(base, new Decimal(10), 1.1);
    price.reload(new Decimal(2));

    it("can buy", () => {
      expect(price.canBuy).toBeTruthy();
    });
    it("maxBuy = 1", () => {
      expect(price.maxBuy.toNumber()).toBe(2);
    });
  });

  describe("buy", () => {
    const base = new BaseUnit("id", "base", "desc");
    base.quantity = new Decimal(35);
    const price = new Price(base, new Decimal(10), 1.1);
    price.reload(new Decimal(1));
    price.buy(new Decimal(2), new Decimal(1));
    price.reload(new Decimal(1));

    it("can buy", () => {
      expect(price.canBuy).toBeTruthy();
    });
    it("maxBuy = 1", () => {
      expect(price.maxBuy.toNumber()).toBe(1);
    });
    it("quantity", () => {
      expect(Math.floor(price.base.quantity.toNumber())).toBe(11);
    });
  });
});
