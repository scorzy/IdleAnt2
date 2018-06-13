import { ActionGroup } from "./action-group";
import { Action } from "../action";
import { BaseUnit } from "../baseUnit";
import { Price } from "../price";
import { FullUnit } from "../full-unit";

describe("ActionGroup", () => {
  it("should create an instance", () => {
    expect(new ActionGroup("", [])).toBeTruthy();
  });

  describe("Reload", () => {
    const act1 = new Action("", "", "", []);
    const act2 = new Action("", "", "", []);

    act1.canBuy = false;

    const group = new ActionGroup("", [act1, act2]);
    group.reload();

    it("Cannot buy", () => {
      expect(group.canBuy).toBeFalsy();
    });
  });

  describe("Reload prices", () => {
    const unit = new FullUnit("", "", "", new Decimal(100));
    const act1 = new Action("", "", "", [
      new Price(unit, new Decimal(20), 1.1)
    ]);
    const act2 = new Action("", "", "", [
      new Price(unit, new Decimal(30), 1.1)
    ]);
    act1.reload();
    act2.reload();
    const group = new ActionGroup("", [act1, act2]);
    group.reload();

    it("Can buy", () => {
      expect(group.canBuy).toBeTruthy();
    });
    it("Cost = 50", () => {
      expect(group.pricesTemp[0].price.toNumber()).toBe(50);
    });
  });
});
