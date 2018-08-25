import { BugTypes } from "../bugsTypes";
import { Game } from "../game";
import { Prestige } from "./prestige";
import { PrestigeGroup } from "./prestige-group";

export class Followers extends PrestigeGroup {
  constructor() {
    super("foll", "Followers");
  }

  declareStuff(game: Game) {
    game.gatherers.list.filter(u => u.bugType === BugTypes.ANT).forEach(ga => {
      const follower = new Prestige(ga.id, game.genExperiencePrice(5));
      ga.follower = follower;
      this.list.push(follower);
    });
  }
}
