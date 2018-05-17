import { Price } from "./price";
import { BaseUnit } from "./baseUnit";

describe("Price", () => {
  it("should create an instance", () => {

    const base = new BaseUnit("id", "base", "desc");

    expect(new Price(base, new Decimal(1))).toBeTruthy();
  });

  it("reload cannot buy", () => {

    const base = new BaseUnit("id", "base", "desc");
    const price = new Price(base, new Decimal(10), 1.1);
    price.reload(new Decimal(0));

    expect(price.canBuy).toBeFalsy();
    expect(price.maxBuy.toNumber()).toBe(0);

  });

  it("reload can buy", () => {

    const base = new BaseUnit("id", "base", "desc");
    base.quantity = new Decimal(15);
    const price = new Price(base, new Decimal(10), 1.1);
    price.reload(new Decimal(1));

    expect(price.canBuy).toBeTruthy();
    expect(price.maxBuy.toNumber()).toBe(1);

  });

});

