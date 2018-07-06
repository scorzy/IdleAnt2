import { Prestige } from "./prestige";
import { FullUnit } from "../full-unit";

describe("Prestige", () => {
  it("should create an instance", () => {
    expect(new Prestige("", new Decimal(1), new FullUnit(""))).toBeTruthy();
  });
});
