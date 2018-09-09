import { World } from "../world";
import { Run } from "./run";

export class Stats {
  completedWorld = new Decimal(0);
  totalExperience = new Decimal(0);
  worldStartDate = new Date();
  runs = new Array<Run>();
  bestExpS = new Decimal(0);

  constructor() {}

  logWorldCompleted(world: World, skip = false) {
    if (!skip) {
      this.completedWorld = this.completedWorld.plus(1);
      this.totalExperience = this.totalExperience.plus(world.prestige);
      const run = new Run(
        new Date(),
        this.worldStartDate,
        world.name,
        world.prestige,
        !skip
      );
      run.reloadExpPerSec();
      this.runs.unshift(run);
      this.runs[0].reloadExpPerSec();
      if (run.expPerSec.gt(this.bestExpS)) {
        this.bestExpS = new Decimal(run.expPerSec);
      }
    }
    this.worldStartDate = new Date();
    this.runs = this.runs.slice(0, 10);
  }

  //#region Save and Load
  getSave(): any {
    return {
      w: this.completedWorld,
      e: this.totalExperience,
      d: this.worldStartDate,
      r: this.runs.map(r => r.getSave()),
      b: this.bestExpS
    };
  }
  restore(data: any) {
    if ("w" in data) this.completedWorld = new Decimal(data.w);
    if ("e" in data) this.totalExperience = new Decimal(data.e);
    if ("d" in data) this.worldStartDate = new Date(data.d);
    if ("r" in data) this.runs = data.r.map(r => Run.getRun(r));
    if ("b" in data) this.bestExpS = new Decimal(data.d);
  }
  //#endregion
}
