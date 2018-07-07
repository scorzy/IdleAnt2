import { PrestigeGroup } from "./prestige-group";
import { Game } from "../game";
import { Prestige } from "./prestige";

export class Followers extends PrestigeGroup {
  constructor() {
    super("foll", "Followers");
  }

  declareStuff(game: Game) {
    game.gatherers.list.forEach(ga => {
      const follower = new Prestige(ga.id + "_fol", 5, game.experience);
      ga.follower = follower;
      this.list.push(follower);
    });
  }
}
