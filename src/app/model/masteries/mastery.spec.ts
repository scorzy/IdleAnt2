import { Mastery, MasteryTypes } from "./mastery";

describe("Mastery", () => {
  it("should create an instance", () => {
    expect(new Mastery(0, MasteryTypes.MORE_FOLLOWERS)).toBeTruthy();
  });
});
