import { Game } from "../game";
import { Prestige } from "./prestige";
import { PrestigeGroup } from "./prestige-group";

export class Followers extends PrestigeGroup {
  constructor() {
    super("foll", "Followers");
  }

  declareStuff(game: Game) {
    game.gatherers.list.forEach(ga => {
      const follower = new Prestige(ga.id + "_fol", game.genExperiencePrice(5));
      ga.follower = follower;
      this.list.push(follower);
    });
  }
}
