import { World } from "../world";
import { Run } from "./run";
import { Stats } from "./stats";

describe("Stats", () => {
  let stats: Stats;
  beforeEach(() => {
    stats = new Stats();
  });
  it("should create an instance", () => {
    expect(new Stats()).toBeTruthy();
  });
  it("Save", () => {
    stats.completedWorld = new Decimal(12);
    stats.totalExperience = new Decimal(100);
    stats.worldStartDate = new Date();
    stats.worldStartDate.setFullYear(2017);
    for (let i = 0; i < 10; i++) {
      stats.runs.push(
        new Run(
          new Date(new Date().getTime() - 2 * 1000 * 3600),
          new Date(new Date().getTime() - 1 * 1000 * 3600),
          "World " + i,
          new Decimal(i * 10),
          i % 2 === 0
        )
      );
    }
    stats.runs.forEach(r => r.reloadExpPerSec());
    const json1 = JSON.stringify(stats);
    const stats2 = new Stats();
    stats2.restore(stats.getSave());
    const json2 = JSON.stringify(stats2);
    expect(json1).toBe(json2);
  });
  it("LogWorldCompleted", () => {
    const world1 = new World("co");
    world1.name = "World completed";
    world1.prestige = new Decimal(10);
    const world2 = new World("no");
    world1.name = "World NOT completed";
    world1.prestige = new Decimal(10);

    stats.logWorldCompleted(world1);
    stats.logWorldCompleted(world2, true);

    expect(stats.completedWorld.toNumber()).toBe(1);
    expect(stats.runs.length).toBe(1);
  });
});
