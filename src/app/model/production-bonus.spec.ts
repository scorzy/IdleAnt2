import { FullUnit } from "./full-unit";
import { ProductionBonus } from "./production-bonus";

describe("ProductionBonus", () => {
  let unit: FullUnit;
  let bonus: ProductionBonus;
  beforeEach(() => {
    unit = new FullUnit("");
    unit.quantity = new Decimal(10);
    bonus = new ProductionBonus(unit, new Decimal(1));
  });
  it("should create an instance", () => {
    expect(new ProductionBonus(new FullUnit(""), new Decimal(1))).toBeTruthy();
  });
  it("isActive", () => {
    unit.unlocked = false;
    expect(bonus.isActive()).toBeFalsy();
    unit.unlocked = true;
    expect(bonus.isActive()).toBeTruthy();
  });
  it("getBonus", () => {
    unit.unlocked = false;
    expect(bonus.getBonus().toNumber()).toBe(0);

    unit.unlocked = true;
    expect(bonus.getBonus().toNumber()).toBeTruthy(10);
  });
  it("getBonusPercent", () => {
    unit.unlocked = false;
    expect(bonus.getBonusPercent().toNumber()).toBe(0);

    unit.unlocked = true;
    expect(bonus.getBonusPercent().toNumber()).toBeTruthy(10000);
  });
});
