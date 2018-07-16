import { Action } from "../action";
import { STRINGS } from "../strings";
import { Price } from "../price";
import { FullUnit } from "../full-unit";
import { BuyAction } from "../actions/buy-action";

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
