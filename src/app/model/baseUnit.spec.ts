import { BaseUnit } from "./baseUnit";

describe("BaseUnit", () => {
  it("should create an instance", () => {
    expect(new BaseUnit("id", "name", "desc")).toBeTruthy();
  });
});

describe("Save", () => {
  const baseUnit = new BaseUnit("id", "name", "desc", new Decimal(10));
  const other = new BaseUnit("id", "name", "desc");

  other.restore(baseUnit.getSave());

  it("Save works", () => {
    expect(JSON.stringify(baseUnit)).toEqual(JSON.stringify(other));
  });
});

describe("Not load with different id", () => {
  const baseUnit = new BaseUnit("old", "name", "desc", new Decimal(10));
  const other = new BaseUnit("new", "name", "desc");

  other.restore(baseUnit.getSave());

  it("Not Loaded", () => {
    expect(other.restore(baseUnit.getSave())).toBeFalsy();
  });
});
