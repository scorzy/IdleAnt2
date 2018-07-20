import { Stats } from "./stats";
import { Run } from "./run";

describe("Stats", () => {
  it("should create an instance", () => {
    expect(new Stats()).toBeTruthy();
  });
  it("Save", () => {
    const stats = new Stats();
    stats.completedWorld = new Decimal(12);
    stats.totalExperience = new Decimal(100);
    stats.worldStartDate = new Date();
    stats.worldStartDate.setFullYear(2017);
    for (let i = 0; i < 10; i++) {
      stats.runs.push(
        new Run(new Date(), "World " + i, new Decimal(i * 10), i % 2 === 0)
      );
    }
    const json1 = JSON.stringify(stats);
    const stats2 = new Stats();
    stats2.restore(stats.getSave());
    const json2 = JSON.stringify(stats2);
    expect(json1).toBe(json2);
  });
});
