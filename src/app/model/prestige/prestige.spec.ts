import { Prestige } from "./prestige";
import { FullUnit } from "../full-unit";

describe("Prestige", () => {
  it("should create an instance", () => {
    expect(new Prestige("", [])).toBeTruthy();
  });
});
