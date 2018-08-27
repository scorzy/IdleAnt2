import { World } from "../world";
import { Run } from "./run";

export class Stats {
  completedWorld = new Decimal(0);
  totalExperience = new Decimal(0);
  worldStartDate = new Date();
  runs = new Array<Run>();

  constructor() {
    //  Debug sample data
    // this.runs.push(new Run());
    // this.runs.push(new Run());
    // this.runs[0].completed = true;
    // this.runs[0].experience = new Decimal(10);
    // this.runs[0].startDate = new Date(new Date().getTime() - 1 * 1000 * 3600);
    // this.runs[0].worldName = "Prova";
    // this.runs[1].experience = new Decimal(11);
  }

  logWorldCompleted(world: World, skip = false) {
    if (!skip) {
      this.completedWorld = this.completedWorld.plus(1);
      this.totalExperience = this.totalExperience.plus(world.prestige);
      this.runs.unshift(
        new Run(
          new Date(),
          this.worldStartDate,
          world.name,
          world.prestige,
          !skip
        )
      );
    }
    this.runs[0].reloadExpPerSec();
    this.worldStartDate = new Date();
    this.runs = this.runs.slice(0, 10);
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
