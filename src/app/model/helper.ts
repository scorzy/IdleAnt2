import { FullUnit } from "./full-unit";

export class Helper extends FullUnit {
  constructor(id: string) {
    super(id);
  }
  reloadTeamBonus(teamBonus = false, multiBonus: Decimal) {
    return new Decimal(1);
  }
}
