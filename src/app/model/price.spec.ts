import { BaseUnit } from "./baseUnit";
import { Price } from "./price";
import { FullUnit } from "./full-unit";

describe("Price", () => {
  it("should create an instance", () => {
    const base = new FullUnit("id", "base", "desc");
    expect(new Price(base, new Decimal(1))).toBeTruthy();
  });
  it("reload cannot buy", () => {
    const base = new FullUnit("id", "base", "desc");
    const price = new Price(base, new Decimal(10), 1.1);
    price.reload(new Decimal(0));

    expect(price.canBuy).toBeFalsy();
    expect(price.maxBuy.toNumber()).toBe(0);
  });
  it("reload cannot buy 2", () => {
    const unit1 = new FullUnit("u1", "name", "desc");
    unit1.quantity = new Decimal(0);
    const price = new Price(unit1, new Decimal(10), 1.1);
    price.reload(new Decimal(0));

    expect(price.canBuy).toBeFalsy();
    expect(price.maxBuy.toNumber()).toBe(0);
  });
  it("reload can buy", () => {
    const base = new FullUnit("id", "base", "desc");
    base.quantity = new Decimal(15);
    const price = new Price(base, new Decimal(10), 1.1);
    price.reload(new Decimal(1));

    expect(price.canBuy).toBeTruthy();
    expect(price.maxBuy.toNumber()).toBe(1);
  });
  it("reload can buy 2", () => {
    const base = new FullUnit("id", "base", "desc");
    base.quantity = new Decimal(35);
    const price = new Price(base, new Decimal(10), 1.1);
    price.reload(new Decimal(2));

    expect(price.canBuy).toBeTruthy();
    expect(price.maxBuy.toNumber()).toBe(2);
  });
  it("buy", () => {
    const base = new FullUnit("id", "base", "desc");
    base.quantity = new Decimal(35);
    const price = new Price(base, new Decimal(10), 1.1);
    price.reload(new Decimal(1));
    price.buy(new Decimal(2), new Decimal(1));
    price.reload(new Decimal(1));

    expect(price.canBuy).toBeTruthy();
    expect(price.maxBuy.toNumber()).toBe(1);
    expect(Math.floor(price.base.quantity.toNumber())).toBe(11);
  });
  it("reloadPercent", () => {
    const unit = new FullUnit("");
    unit.quantity = new Decimal(60);
    const price = new Price(unit, new Decimal(200));
    price.reloadPercent();
    expect(price.completedPercent).toBe(30);
  });
});
