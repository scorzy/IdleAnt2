import { FullUnit } from "../full-unit";
import { TwinAction } from "./twin-action";

describe("TwinAction", () => {
  const twinRes = jasmine.createSpyObj("Research", ["unlocked"]);
  twinRes.done = true;

  it("should create an instance", () => {
    expect(new TwinAction([], new FullUnit("id", "", ""))).toBeTruthy();
  });
  it("Buy more", () => {
    const testUnit = new FullUnit("", "", "");
    testUnit.generateBuyAction([]);
    testUnit.generateTwinAction([]);
    testUnit.twinAction.quantity = new Decimal(1);
    testUnit.buyAction.buy();
    expect(testUnit.quantity.toNumber()).toBe(2);
  });
  it("Retroactive", () => {
    const testUnit = new FullUnit("", "", "");
    testUnit.generateBuyAction([]);
    testUnit.generateTwinAction([]);
    testUnit.twinAction.twinRes = twinRes;
    testUnit.quantity = new Decimal(10);
    testUnit.buyAction.quantity = new Decimal(10);
    testUnit.twinAction.buy();

    expect(testUnit.quantity.toNumber()).toBe(20);
  });
});
