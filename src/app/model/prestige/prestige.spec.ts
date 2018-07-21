import { FullUnit } from "../full-unit";
import { Prestige } from "./prestige";

describe("Prestige", () => {
  it("should create an instance", () => {
    expect(new Prestige("", [])).toBeTruthy();
  });
});
