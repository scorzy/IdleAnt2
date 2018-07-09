import { Game } from "../game";
import { Prestige } from "./prestige";
import { PrestigeGroup } from "./prestige-group";

export class Followers2 extends PrestigeGroup {
  list: any;
  constructor() {
    super("foll2", "Worker Followers");
  }

  declareStuff(game: Game) {
    game.advWorkers.list.forEach(ga => {
      const follower = new Prestige(ga.id + "_fol2", 10, game.experience);
      ga.follower = follower;
      this.list.push(follower);
    });
  }
}
