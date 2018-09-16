import { Action } from "../action";
import { Game } from "../game";
import { AutoBuyUnlock } from "./auto-buy-unlock";
import { Followers } from "./followers";
import { Followers2 } from "./followers2";
import { PrestigeGroup } from "./prestige-group";
import { Swarm } from "./swarm";
import { Team } from "./team";
import { Technology } from "./technology";
import { Time } from "./time";
import { WorldPrestige } from "./world-prestige";

export class AllPrestige {
  followers: Followers;
  followers2: Followers2;
  time: Time;
  autoBuyUnlock: AutoBuyUnlock;
  technology: Technology;
  team: Team;
  worldPrestige: WorldPrestige;
  swarm: Swarm;

  prestigeGroups = new Array<PrestigeGroup>();
  prestigeList = new Array<Action>();

  constructor() {
    this.followers = new Followers();
    this.followers2 = new Followers2();
    this.time = new Time();
    this.autoBuyUnlock = new AutoBuyUnlock();
    this.technology = new Technology();
    this.team = new Team();
    this.worldPrestige = new WorldPrestige();
    this.swarm = new Swarm();

    this.prestigeGroups.push(
      this.followers,
      this.followers2,
      this.swarm,
      this.technology,
      this.team,
      this.time,
      this.worldPrestige,
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
      const prest = this.prestigeList.find(u => u.id === p.i);
      if (prest) {
        prest.restore(p);
      } else {
        console.log(p);
      }
    }
  }
  //#endregion
}
