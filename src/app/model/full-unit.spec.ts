import { Action } from "./action";
import { FullUnit } from "./full-unit";

describe("FullUnit", () => {
  it("should create an instance", () => {
    expect(new FullUnit("id", "name", "desc")).toBeTruthy();
  });
  it("Save with actions", () => {
    const baseUnit = new FullUnit("id", "name", "desc", new Decimal(10));
    const other = new FullUnit("id", "name", "desc");

    baseUnit.actions = [
      new Action("actId", "actName", "actDesc"),
      new Action("actId2", "actName2", "actDesc2")
    ];
    baseUnit.actions[1].done = true;
    baseUnit.actions[1].complete = true;
    baseUnit.unlocked = true;
    const save = baseUnit.getSave();

    other.actions = [
      new Action("actId", "actName", "actDesc"),
      new Action("actId2", "actName2", "actDesc2")
    ];
    other.restore(save);

    expect(JSON.stringify(baseUnit)).toEqual(JSON.stringify(other));
  });
  it("Generate Buy Action", () => {
    const stuff = new FullUnit("id", "name", "desc");
    stuff.generateBuyAction([]);
    expect(stuff.buyAction).toBeTruthy();
    expect(stuff.actions.length).toBe(1);
  });
  it("Unlock", () => {
    const stuff = new FullUnit("id", "name", "desc");
    const original = stuff.unlocked;
    stuff.unlock();
    expect(original).toBeFalsy();
    expect(stuff.unlocked).toBeTruthy();
  });
  it("isStopped()", () => {
    const stopped = new FullUnit("id3", "name", "desc");
    const notStopped = new FullUnit("id2", "name", "desc");

    stopped.efficiency = 0;
    notStopped.efficiency = 10;

    expect(stopped.isStopped()).toBeTruthy();
    expect(notStopped.isStopped()).toBeFalsy();
  });
  it("Reset", () => {
    const buySpy = jasmine.createSpyObj("BuyAction", ["reset"]);
    const teamSpy = jasmine.createSpyObj("BuyAction", ["reset"]);
    const twinSpy = jasmine.createSpyObj("BuyAction", ["reset"]);

    const unit = new FullUnit("id", "", "", new Decimal(10));
    unit.a = new Decimal(10);
    unit.b = new Decimal(10);
    unit.c = new Decimal(10);

    unit.buyAction = buySpy;
    unit.teamAction = teamSpy;
    unit.twinAction = twinSpy;

    unit.reset();

    expect(unit.quantity.toNumber()).toBe(0);
    expect(unit.a.toNumber()).toBe(0);
    expect(unit.b.toNumber()).toBe(0);
    expect(unit.c.toNumber()).toBe(0);
    expect(buySpy.reset).toHaveBeenCalled();
    expect(teamSpy.reset).toHaveBeenCalled();
    expect(twinSpy.reset).toHaveBeenCalled();
  });
});
