import { FullUnit } from "./full-unit";
import { Action } from "./action";

describe("FullUnit", () => {
  it("should create an instance", () => {
    expect(new FullUnit("id", "name", "desc")).toBeTruthy();
  });
  describe("Save with actions", () => {
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

    it("Save works", () => {
      expect(JSON.stringify(baseUnit)).toEqual(JSON.stringify(other));
    });
  });
  describe("Generate Buy Action", () => {
    const stuff = new FullUnit("id", "name", "desc");
    stuff.generateBuyAction([]);
    it("Have buy action", () => {
      expect(stuff.buyAction).toBeTruthy();
    });
    it("Have one action", () => {
      expect(stuff.actions.length).toBe(1);
    });
  });
  describe("Unlock", () => {
    const stuff = new FullUnit("id", "name", "desc");
    const original = stuff.unlocked;
    stuff.unlock();
    it("Start locked", () => {
      expect(original).toBeFalsy();
    });
    it("Unlocked", () => {
      expect(stuff.unlocked).toBeTruthy();
    });
  });
  describe("isStopped()", () => {
    const stopped = new FullUnit("id3", "name", "desc");
    const notStopped = new FullUnit("id2", "name", "desc");

    stopped.efficiency = 0;
    notStopped.efficiency = 10;

    it("Stopped", () => {
      expect(stopped.isStopped()).toBeTruthy();
    });
    it("Not stopped", () => {
      expect(notStopped.isStopped()).toBeFalsy();
    });
  });
});
