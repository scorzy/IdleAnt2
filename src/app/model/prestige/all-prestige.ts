import { Action } from "../action";
import { PrestigeGroup } from "./prestige-group";
import { Game } from "../game";
import { Followers } from "./followers";

export class AllPrestige {
  followers: Followers;

  prestigeGroups = new Array<PrestigeGroup>();
  prestigeList = new Array<Action>();

  constructor() {
    this.followers = new Followers();
    this.prestigeGroups.push(this.followers);
  }

  declareStuff(game: Game) {
    this.prestigeGroups.forEach(g => {
      g.declareStuff(game);
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
