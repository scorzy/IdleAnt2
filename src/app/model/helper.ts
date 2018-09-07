import { FullUnit } from "./full-unit";
import { Game } from "./game";
import { MasteryTypes } from "./masteries/mastery";
import { ProductionBonus } from "./production-bonus";

export class Helper extends FullUnit {
  helpBonus: ProductionBonus;

  constructor(id: string, rateo: Decimal | number, private game: Game) {
    super(id);
    this.helpBonus = new ProductionBonus(this, new Decimal(rateo));
    this.helpBonus.getMultiplier = () => {
      if (this.efficiency <= 0) return new Decimal(0);

      return new Decimal(
        ((1 + this.game.allMateries.getSum(MasteryTypes.BETTER_HELPERS)) *
          this.efficiency) /
          100
      );
    };
  }
  reloadTeamBonus(teamBonus = false, multiBonus: Decimal) {
    return new Decimal(1);
  }
}
