import { Action } from "../action";
import { AutoBuy } from "./auto-buy";
import { AutoBuyManager } from "./auto-buy-manager";

describe("AutoBuy", () => {
  const autoBuyManager = new AutoBuyManager();

  it("should create an instance", () => {
    expect(
      new AutoBuy(new Action("", "", "", []), [], autoBuyManager)
    ).toBeTruthy();
  });
  it("reloadLevel", () => {
    const auto = new AutoBuy(new Action("", "", "", []), [], autoBuyManager);
    auto.quantity = new Decimal(1);
    auto.startMax = 5;
    auto.reloadLevel();
    expect(auto.max).toBe(5);
    expect(auto.multiBuy.toNumber()).toBe(1);

    auto.quantity = new Decimal(3);
    auto.reloadLevel();
    expect(auto.max).toBe(2.45);
    expect(auto.multiBuy.toNumber()).toBe(1);

    auto.quantity = new Decimal(10);
    auto.reloadLevel();
    expect(auto.max).toBe(0.25);
    expect(auto.multiBuy.toNumber()).toBe(2);

    auto.quantity = new Decimal(12);
    auto.reloadLevel();
    expect(auto.max).toBe(0.25);
    expect(auto.multiBuy.toNumber()).toBe(8);
  });
  it("save and load", () => {
    const auto1 = new AutoBuy(new Action("", "", "", []), [], autoBuyManager);
    const auto2 = new AutoBuy(new Action("", "", "", []), [], autoBuyManager);

    auto1.active = true;
    auto1.priority = 100;
    auto1.current = 2;
    auto1.quantity = new Decimal(5);
    auto1.reloadLevel();

    const result = auto2.restore(auto1.getSave());
    expect(result).toBeTruthy();

    expect(auto1.active).toBe(auto2.active);
    expect(auto1.priority).toBe(auto2.priority);
    expect(auto1.current).toBe(auto2.current);
    expect(auto1.quantity.toNumber()).toBe(auto2.quantity.toNumber());
    expect(auto1.max).toBe(auto2.max);
  });
  it("save and load 2", () => {
    const auto1 = new AutoBuy(new Action("1", "", "", []), [], autoBuyManager);
    const auto2 = new AutoBuy(new Action("2", "", "", []), [], autoBuyManager);

    const result = auto2.restore(auto1.getSave());
    expect(result).toBeFalsy();
  });
  it("update", () => {
    const act = jasmine.createSpyObj("Action", { buy: true });
    act.checkResearch = () => {
      return true;
    };

    const auto1 = new AutoBuy(act, [], autoBuyManager);

    auto1.active = true;
    auto1.quantity = new Decimal(1);
    auto1.reloadLevel();
    auto1.update();
    expect(act.buy).toHaveBeenCalledTimes(0);
    for (let i = 0; i < 19; i++) auto1.update();
    expect(act.buy).toHaveBeenCalledTimes(1);
    expect(auto1.current).toBe(0);
  });
});
