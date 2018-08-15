import { Game } from "../game";
import { ProductionBonus } from "../production-bonus";
import { Prestige } from "./prestige";
import { PrestigeGroup } from "./prestige-group";

export class Team extends PrestigeGroup {
  betterTeam: Prestige;

  constructor() {
    super("teamPrest", "Team");
  }

  declareStuff(game: Game) {
    this.betterTeam = new Prestige("teamP", game.genExperiencePrice(10));
    this.list = [this.betterTeam];
  }
}
