import { FullUnit } from "../full-unit";
import { Price } from "../price";
import { Prestige } from "./prestige";

describe("Prestige", () => {
  it("should create an instance", () => {
    expect(new Prestige("", [])).toBeTruthy();
  });
  it("getTotalExperience", () => {
    const prestige = new Prestige("", [new Price(new FullUnit(""), 10, 1.5)]);
    expect(prestige.getTotalExperience().toNumber()).toBe(0);
    prestige.quantity = new Decimal(1);
    expect(prestige.getTotalExperience().toNumber()).toBe(10);
    prestige.quantity = new Decimal(2);
    expect(prestige.getTotalExperience().toNumber()).toBe(25);
  });
  it("getTotalExperience", () => {
    const prestige = new Prestige("", []);
    prestige.quantity = new Decimal(10);
    expect(prestige.getTotalExperience().toNumber()).toBe(0);
  });
});
