import { BugTypes } from "../bugsTypes";
import { Game } from "../game";
import { Prestige } from "./prestige";
import { PrestigeGroup } from "./prestige-group";

export class Followers2 extends PrestigeGroup {
  list: any;
  constructor() {
    super("foll2", "Worker Followers");
  }

  declareStuff(game: Game) {
    game.advWorkers.list.filter(u => u.bugType === BugTypes.ANT).forEach(ga => {
      const follower = new Prestige(ga.id, game.genExperiencePrice(10));
      ga.follower = follower;
      this.list.push(follower);
    });
  }
}
