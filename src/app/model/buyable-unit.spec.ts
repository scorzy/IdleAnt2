import { BuyableUnit } from "./buyable-unit";

describe("BuyableUnit", () => {
  it("should create an instance", () => {
    expect(new BuyableUnit("id", "test", "desc")).toBeTruthy();
  });
});
