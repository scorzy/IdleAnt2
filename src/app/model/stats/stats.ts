import { World } from "../world";
import { Run } from "./run";

export class Stats {
  completedWorld = new Decimal(0);
  totalExperience = new Decimal(0);
  worldStartDate = new Date();
  runs = new Array<Run>();

  logWorldCompleted(world: World, skip = false) {
    if (!skip) {
      this.completedWorld = this.completedWorld.plus(1);
      this.totalExperience = this.totalExperience.plus(world.prestige);
    }
    this.worldStartDate = new Date();
    this.runs.unshift(
      new Run(this.worldStartDate, world.name, world.prestige, !skip)
    );
    this.runs = this.runs.slice(1, 10);
  }

  //#region Save and Load
  getSave(): any {
    return {
      w: this.completedWorld,
      e: this.totalExperience,
      d: this.worldStartDate,
      r: this.runs.map(r => r.getSave())
    };
  }
  restore(data: any) {
    if ("w" in data) this.completedWorld = new Decimal(data.w);
    if ("e" in data) this.totalExperience = new Decimal(data.e);
    if ("d" in data) this.worldStartDate = new Date(data.d);
    if ("r" in data) this.runs = data.r.map(r => Run.getRun(r));
  }
  //#endregion
}
