import { Tags } from "../bugsTypes";
import { Game } from "../game";
import { ProductionBonus } from "../production-bonus";
import { Prestige } from "./prestige";
import { PrestigeGroup } from "./prestige-group";

export class Swarm extends PrestigeGroup {
  larvaBonus: Prestige;
  queenBonus: Prestige;

  constructor() {
    super("swarmPrest", "Swarm");
  }

  declareStuff(game: Game) {
    this.larvaBonus = new Prestige("sl", game.genExperiencePrice(10));
    this.queenBonus = new Prestige("sq", game.genExperiencePrice(10));
    this.list = [this.larvaBonus, this.queenBonus];

    const lb = new ProductionBonus(this.larvaBonus, new Decimal(0.1));
    game.units
      .filter(u => u.tags.includes(Tags.LARVA))
      .forEach(u => u.productionsBonus.push(lb));

    const qb = new ProductionBonus(this.queenBonus, new Decimal(0.1));
    game.units
      .filter(u => u.tags.includes(Tags.QUEEN))
      .forEach(u => u.productionsBonus.push(qb));
  }
}
