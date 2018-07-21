import { Action } from "../action";
import { Game } from "../game";
import { AutoBuyUnlock } from "./auto-buy-unlock";
import { Followers } from "./followers";
import { Followers2 } from "./followers2";
import { PrestigeGroup } from "./prestige-group";
import { Time } from "./time";

export class AllPrestige {
  followers: Followers;
  followers2: Followers2;
  time: Time;
  autoBuyUnlock: AutoBuyUnlock;

  prestigeGroups = new Array<PrestigeGroup>();
  prestigeList = new Array<Action>();

  constructor() {
    this.followers = new Followers();
    this.followers2 = new Followers2();
    this.time = new Time();
    this.autoBuyUnlock = new AutoBuyUnlock();
    this.prestigeGroups.push(
      this.followers,
      this.followers2,
      this.time,
      this.autoBuyUnlock
    );
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
    for (const p of data.prest) {
      this.prestigeList.find(u => u.id === p.i).restore(p);
    }
  }
  //#endregion
}
