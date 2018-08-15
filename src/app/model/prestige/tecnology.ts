import { Game } from "../game";
import { ProductionBonus } from "../production-bonus";
import { Prestige } from "./prestige";
import { PrestigeGroup } from "./prestige-group";

export class Tecnology extends PrestigeGroup {
  farming: Prestige;
  carpentry: Prestige;
  mining: Prestige;
  studing: Prestige;

  constructor() {
    super("tecno", "Tecnology");
  }

  declareStuff(game: Game) {
    this.farming = new Prestige("tecFar", game.genExperiencePrice(10));
    this.carpentry = new Prestige("tecCar", game.genExperiencePrice(10));
    this.mining = new Prestige("tecMin", game.genExperiencePrice(10));
    this.studing = new Prestige("tecStu", game.genExperiencePrice(10));

    this.list = [this.farming, this.carpentry, this.mining, this.studing];

    game.materials.food.productionsBonus.push(
      new ProductionBonus(this.farming, new Decimal(0.1))
    );
    game.materials.wood.productionsBonus.push(
      new ProductionBonus(this.carpentry, new Decimal(0.1))
    );
    game.materials.crystal.productionsBonus.push(
      new ProductionBonus(this.mining, new Decimal(0.1))
    );
    game.materials.science.productionsBonus.push(
      new ProductionBonus(this.studing, new Decimal(0.1))
    );
  }
}
