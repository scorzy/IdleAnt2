import { World } from "./world";

export class Stats {
  completedWorld = new Decimal(0);
  totalExperience = new Decimal(0);
  worldStartDate = new Date();

  logWorldCompleted(world: World, skip = false) {
    if (!skip) {
      this.completedWorld = this.completedWorld.plus(1);
      this.totalExperience = this.totalExperience.plus(world.prestige);
    }
    this.worldStartDate = new Date();
  }

  //#region Save and Load
  getSave(): any {
    return {
      w: this.completedWorld,
      e: this.totalExperience,
      d: this.worldStartDate
    };
  }
  restore(data: any) {
    if ("w" in data) this.completedWorld = new Decimal(data.w);
    if ("e" in data) this.totalExperience = new Decimal(data.export);
    if ("d" in data) this.worldStartDate = new Date(data.d);
  }
  //#endregion
}
