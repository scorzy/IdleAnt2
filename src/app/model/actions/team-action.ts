import { Action } from "../action";
import { FullUnit } from "../full-unit";
import { Price } from "../price";
import { Research } from "../research";

export class TeamAction extends Action {
  teamRes: Research;

  constructor(prices: Price[]) {
    super("T", "Team", "Get a better team work bonus", prices);
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
