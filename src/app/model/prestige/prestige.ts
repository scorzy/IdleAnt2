import { Action } from "../action";
import { STRINGS } from "../strings";
import { Price } from "../price";
import { FullUnit } from "../full-unit";

export class Prestige extends Action {
  constructor(id: string, price: Decimal, experience: FullUnit) {
    super(id, "", "", [new Price(experience, price, 1.2)]);
    if (id in STRINGS.prestige) {
      this.name = STRINGS.prestige[id][0];
      this.description = STRINGS.prestige[id][1];
    }
  }
}
