import { BuyAction } from "../actions/buy-action";
import { Price } from "../price";
import { STRINGS } from "../strings";

export class Prestige extends BuyAction {
  constructor(id: string, price: Price[], name = "") {
    super(price, null, [], id);
    this.name = name;
    if (id in STRINGS.prestige) {
      this.name = STRINGS.prestige[id][0];
      this.description = STRINGS.prestige[id][1];
    }
  }
}
