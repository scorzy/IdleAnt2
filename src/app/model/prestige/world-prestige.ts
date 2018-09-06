import { Game } from "../game";
import { ProductionBonus } from "../production-bonus";
import { Prestige } from "./prestige";
import { PrestigeGroup } from "./prestige-group";

export class WorldPrestige extends PrestigeGroup {
  betterWorlds: Prestige;
  betterArmy: Prestige;
  maxLevel: Prestige;

  constructor() {
    super("world", "World");
  }

  declareStuff(game: Game) {
    this.betterWorlds = new Prestige("w", game.genExperiencePrice(20));
    this.betterArmy = new Prestige("r", game.genExperiencePrice(20));
    this.maxLevel = new Prestige("L", game.genExperiencePrice(20));
    this.list = [this.betterWorlds, this.betterArmy, this.maxLevel];

    const killBonus = new ProductionBonus(this.betterArmy, new Decimal(0.1));
    game.killers.list.forEach(k => k.productionsAll.push(killBonus));
  }
}
