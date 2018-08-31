import { getGame } from "../../app.component.spec";
import { AllMasteries } from "./all-masteries";

describe("AllMasteries", () => {
  it("should create an instance", () => {
    expect(new AllMasteries(getGame())).toBeTruthy();
  });
});
