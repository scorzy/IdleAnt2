import { FullUnit } from "../full-unit";
import { TwinAction } from "./twin-action";

describe("TwinAction", () => {
  const twinRes = jasmine.createSpyObj("Research", ["unlocked"]);
  twinRes.done = true;

  it("should create an instance", () => {
    expect(new TwinAction([], new FullUnit("id", "", ""))).toBeTruthy();
  });
  describe("Buy more", () => {
    const testUnit = new FullUnit("", "", "");
    testUnit.generateBuyAction([]);
    testUnit.generateTwinAction([]);
    testUnit.twinAction.quantity = new Decimal(1);
    testUnit.buyAction.buy();
    it("quantity = 2", () => {
      expect(testUnit.quantity.toNumber()).toBe(2);
    });
  });
  describe("Retroactive", () => {
    const testUnit = new FullUnit("", "", "");
    testUnit.generateBuyAction([]);
    testUnit.generateTwinAction([]);
    testUnit.twinAction.twinRes = twinRes;
    testUnit.quantity = new Decimal(10);
    testUnit.buyAction.quantity = new Decimal(10);
    testUnit.twinAction.buy();

    it("quantity = 20", () => {
      expect(testUnit.quantity.toNumber()).toBe(20);
    });
  });
});
