import { Action } from "../action";
import { FullUnit } from "../full-unit";
import { PrestigeGroup } from "./prestige-group";

export class AllPrestige {
  prestigeGroups = new Array<PrestigeGroup>();
  prestigeList = new Array<Action>();
  declareStuff(experience: FullUnit) {
    this.prestigeGroups.forEach(g => {
      g.list.forEach(p => this.prestigeList.push(p));
    });
  }

  //#region Save and Load
  getSave(): any {
    return {
      prest: this.prestigeList.map(a => a.getSave())
    };
  }
  restore(data: any): boolean {
    if (!("prest" in data)) return false;
    for (const p of data.prest)
      this.prestigeList.find(u => u.id === p.i).restore(p);
  }
  //#endregion
}
