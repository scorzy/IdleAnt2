import { FullUnit } from "./full-unit";
import { ProductionBonus } from "./production-bonus";

export class Helper extends FullUnit {
  helpBonus: ProductionBonus;

  constructor(id: string, rateo: Decimal | number) {
    super(id);
    this.helpBonus = new ProductionBonus(this, new Decimal(rateo));
    this.helpBonus.getMultiplier = () => new Decimal(this.efficiency / 100);
  }
  reloadTeamBonus(teamBonus = false, multiBonus: Decimal) {
    return new Decimal(1);
  }
}
