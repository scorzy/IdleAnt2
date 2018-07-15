import { Action } from "../action";
import { Price } from "../price";
import { FullUnit } from "../full-unit";
import { Research } from "../research";

export class TeamAction extends Action {
  constructor(prices: Price[], public teamRes: Research) {
    super("team", "Team", "Get a better team work bonus", prices);
    this.autoBuyPriceMulti = 1.5;
    this.autoBuyTimeMulti = 1.5;
  }

  reload() {
    if (this.teamRes.done) {
      super.reload();
    } else {
      this.canBuy = false;
      // this.maxBuy = new Decimal(0);
    }
  }
}
