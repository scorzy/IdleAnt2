import { Game } from "../game";
import { MasteryTypes } from "../masteries/mastery";
import { ProductionBonus } from "../production-bonus";
import { Prestige } from "./prestige";
import { PrestigeGroup } from "./prestige-group";

export class Technology extends PrestigeGroup {
  farming: Prestige;
  carpentry: Prestige;
  mining: Prestige;
  studing: Prestige;

  constructor() {
    super("tecno", "Technology");
  }

  declareStuff(game: Game) {
    this.farming = new Prestige("F", game.genExperiencePrice(10));
    this.carpentry = new Prestige("C", game.genExperiencePrice(10));
    this.mining = new Prestige("n", game.genExperiencePrice(10));
    this.studing = new Prestige("s", game.genExperiencePrice(10));

    this.list = [this.farming, this.carpentry, this.mining, this.studing];

    const foodBon = new ProductionBonus(this.farming, new Decimal(0.1));
    game.materials.food.productionsBonus.push(foodBon);

    const soilBon = new ProductionBonus(this.carpentry, new Decimal(0.1));
    game.materials.soil.productionsBonus.push(soilBon);

    const cryBon = new ProductionBonus(this.mining, new Decimal(0.1));
    game.materials.crystal.productionsBonus.push(cryBon);

    const scieBon = new ProductionBonus(this.studing, new Decimal(0.1));
    game.materials.science.productionsBonus.push(scieBon);

    [foodBon, soilBon, cryBon, scieBon].forEach(b => {
      b.getMultiplier = () => {
        return new Decimal(
          1 + game.allMateries.getSum(MasteryTypes.TECHNOLOGY_PRESTIGE)
        );
      };
    });
  }
}
