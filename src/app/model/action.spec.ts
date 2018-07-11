import { Action } from "./action";
import { Price } from "./price";
import { FullUnit } from "./full-unit";
import { iterateListLike } from "@angular/core/src/change_detection/change_detection_util";

describe("Action", () => {
  let action: Action;
  beforeEach(() => {
    action = new Action("id", "name", "desc");
  });

  it("should create an instance", () => {
    expect(new Action("id", "name", "desc")).toBeTruthy();
  });
  it("Save and Load", () => {
    const origin = new Action("id", "name", "desc");
    const other = new Action("id", "name", "desc");

    const save = origin.getSave();
    const result = other.restore(save);

    const different = new Action("id2", "name2", "desc2");
    const result2 = different.restore(save);

    origin.complete = true;
    origin.done = true;

    const result3 = other.restore(origin.getSave());

    expect(result2).toBeFalsy();
    expect(result).toBeTruthy();
    expect(JSON.stringify(origin)).toEqual(JSON.stringify(other));
    expect(result3).toBeTruthy();
    expect(JSON.stringify(origin)).toEqual(JSON.stringify(other));
  });
  it("Reload 1", () => {
    const unit1 = new FullUnit("u1", "name", "desc");
    const unit2 = new FullUnit("u2", "name", "desc");
    const unit3 = new FullUnit("u3", "name", "desc");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];
    unit1.quantity = new Decimal(0);
    unit2.quantity = new Decimal(0);
    unit3.quantity = new Decimal(0);
    action.reload();

    expect(action.canBuy).toBeFalsy();
    expect(action.maxBuy.toNumber()).toBe(0);
    expect(action.done).toBeFalsy();
  });
  it("Reload 2", () => {
    const unit1 = new FullUnit("a1", "name", "desc");
    const unit2 = new FullUnit("a2", "name", "desc");
    const unit3 = new FullUnit("a3", "name", "desc");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];

    unit1.quantity = new Decimal(35);
    unit2.quantity = new Decimal(350);
    unit3.quantity = new Decimal(0);
    action.reload();

    expect(action.canBuy).toBeFalsy();
    expect(action.maxBuy.toNumber()).toBe(0);
  });
  it("Reload 3", () => {
    const unit1 = new FullUnit("u1", "", "");
    const unit2 = new FullUnit("u2", "", "");
    const unit3 = new FullUnit("u3", "", "");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];

    unit1.quantity = new Decimal(35);
    unit2.quantity = new Decimal(350);
    unit3.quantity = new Decimal(1e10);
    action.reload();

    expect(action.canBuy).toBeTruthy();
    expect(action.maxBuy.toNumber()).toBe(3);
  });
  it("Reload limited", () => {
    const unit1 = new FullUnit("l1", "", "");
    const unit2 = new FullUnit("l2", "", "");
    const unit3 = new FullUnit("l3", "", "");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];
    action.isLimited = true;

    unit1.quantity = new Decimal(1e500);
    unit2.quantity = new Decimal(1e500);
    unit3.quantity = new Decimal(1e500);
    action.limit = new Decimal(10);
    action.reload();

    expect(action.canBuy).toBeTruthy();
    expect(action.maxBuy.toNumber()).toBe(10);
  });
  it("Reload limited 2", () => {
    const unit1 = new FullUnit("l21", "", "");
    const unit2 = new FullUnit("l22", "", "");
    const unit3 = new FullUnit("l23", "", "");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];
    action.isLimited = true;

    unit1.quantity = new Decimal(1e500);
    unit2.quantity = new Decimal(1e500);
    unit3.quantity = new Decimal(1e500);
    action.limit = new Decimal(10);
    action.quantity = new Decimal(3);
    action.reload();

    expect(action.canBuy).toBeTruthy();
    expect(action.maxBuy.toNumber()).toBe(7);
  });
  it("Reload limited 3", () => {
    const unit1 = new FullUnit("u31", "", "");
    const unit2 = new FullUnit("u32", "", "");
    const unit3 = new FullUnit("u33", "", "");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];
    action.isLimited = true;

    unit1.quantity = new Decimal(1e500);
    unit2.quantity = new Decimal(1e500);
    unit3.quantity = new Decimal(1e500);
    action.limit = new Decimal(10);
    action.quantity = new Decimal(9);
    action.reload();

    expect(action.canBuy).toBeTruthy();
    expect(action.maxBuy.toNumber()).toBe(1);
  });
  it("Reload limited 4", () => {
    const unit1 = new FullUnit("u41", "", "");
    const unit2 = new FullUnit("u42", "", "");
    const unit3 = new FullUnit("u43", "", "");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];
    action.isLimited = true;

    unit1.quantity = new Decimal(1e500);
    unit2.quantity = new Decimal(1e500);
    unit3.quantity = new Decimal(1e500);
    action.limit = new Decimal(10);
    action.quantity = new Decimal(10);
    action.reload();

    expect(action.canBuy).toBeFalsy();
    expect(action.maxBuy.toNumber()).toBe(0);
  });
  it("Buy 1", () => {
    const unit1 = new FullUnit("b1", "", "");
    const unit2 = new FullUnit("b2", "", "");
    const unit3 = new FullUnit("b3", "", "");

    action.prices = [
      new Price(unit1, new Decimal(10), 1.1),
      new Price(unit2, new Decimal(100), 1.1),
      new Price(unit3, new Decimal(1e3), 1.1)
    ];
    action.isLimited = false;
    unit1.quantity = new Decimal(35);
    unit2.quantity = new Decimal(350);
    unit3.quantity = new Decimal(1e10);
    action.reload();

    const ret = action.buy(new Decimal(2));

    expect(unit1.quantity.toNumber()).toBe(14);
    expect(ret).toBeTruthy();
    expect(action.quantity.toNumber()).toBe(2);
    expect(action.maxBuy.toNumber()).toBe(1);
    expect(action.canBuy).toBeTruthy();
    expect(action.done).toBeTruthy();
    expect(action.complete).toBeFalsy();
  });
  it("Buy 2", () => {
    const unit1 = new FullUnit("b21", "", "");
    const unit2 = new FullUnit("b22", "", "");
    const unit3 = new FullUnit("b23", "", "");

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

    expect(ret).toBeFalsy();
    expect(action.canBuy).toBeFalsy();
    expect(action.maxBuy.toNumber()).toBe(0);
    expect(action.complete).toBeFalsy();
  });
  it("Buy limited", () => {
    const unit1 = new FullUnit("bl1", "", "");

    action.prices = [new Price(unit1, new Decimal(10), 1.1)];
    action.isLimited = true;

    unit1.quantity = new Decimal(1e500);
    action.limit = new Decimal(10);
    action.buy(new Decimal(10));

    expect(action.maxBuy.toNumber()).toBe(0);
    expect(action.canBuy).toBeFalsy();
    expect(action.done).toBeTruthy();
    expect(action.complete).toBeTruthy();
  });
  it("Buy last", () => {
    const unit1 = new FullUnit("ul1", "", "");

    action.prices = [new Price(unit1, new Decimal(10), 1.1)];
    action.isLimited = true;

    unit1.quantity = new Decimal(1e500);
    action.limit = new Decimal(10);
    action.quantity = new Decimal(9);
    const ret = action.buy(new Decimal(1));

    expect(ret).toBeTruthy();
    expect(action.canBuy).toBeFalsy();
    expect(action.maxBuy.toNumber()).toBe(0);
    expect(action.done).toBeTruthy();
    expect(action.complete).toBeTruthy();
  });
  it("Buy all exepct one", () => {
    const unit1 = new FullUnit("qwe", "", "");

    action.prices = [new Price(unit1, new Decimal(10), 1.1)];
    action.isLimited = true;

    unit1.quantity = new Decimal(1e500);
    action.limit = new Decimal(10);
    action.quantity = new Decimal(8);
    const ret = action.buy(new Decimal(1));

    expect(ret).toBeTruthy();
    expect(action.canBuy).toBeTruthy();
    expect(action.maxBuy.toNumber()).toBe(1);
    expect(action.done).toBeTruthy();
    expect(action.complete).toBeFalsy();
  });
  it("Reset", () => {
    action.buy();
    action.buy();
    action.reset();
    expect(action.quantity.toNumber()).toBe(0);
  });
});
