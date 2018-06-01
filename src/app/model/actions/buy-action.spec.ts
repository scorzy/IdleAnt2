import { BuyAction } from "./buy-action";
import { FullUnit } from "../full-unit";
import { Price } from "../price";
import { Action } from "../action";
import { TwinAction } from "./twin-action";

describe("BuyAction", () => {
  it("should create an instance", () => {
    expect(new BuyAction([], null)).toBeTruthy();
  });
  it("should buy units", () => {
    const unit = new FullUnit("id", "name", "desc", new Decimal(0));
    const buyAction = new BuyAction([], unit);
    buyAction.buy(new Decimal(10));
    expect(unit.quantity.toNumber()).toBe(10);
  });
  it("not buy", () => {
    const unit = new FullUnit("id", "name", "desc", new Decimal(0));
    const cuerency = new FullUnit("id2", "name2", "desc2", new Decimal(0));
    const buyAction = new BuyAction(
      [new Price(cuerency, new Decimal(1e50), 1.1)],
      unit
    );
    buyAction.buy(new Decimal(10));
    expect(unit.quantity.toNumber()).toBe(0);
  });
  it("twin", () => {
    const unit = new FullUnit("id2", "name2", "desc2", new Decimal(0));
    unit.twinAction = new TwinAction([], unit);
    unit.twinAction.quantity = new Decimal(10);
    const buyAction = new BuyAction([], unit);
    buyAction.buy(new Decimal(10));
    expect(unit.quantity.toNumber()).toBe(110);
  });
});
