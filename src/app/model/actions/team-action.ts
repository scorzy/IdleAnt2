import { Action } from "../action";
import { Price } from "../price";
import { FullUnit } from "../full-unit";
import { Research } from "../research";

export class TeamAction extends Action {
  constructor(
    prices: Price[],
    private unit: FullUnit,
    public teamRes: Research
  ) {
    super("team", "Team", "Get a better team work bonus", prices);
  }

  public reload() {
    if (this.teamRes.done) {
      super.reload();
    } else {
      this.canBuy = false;
      // this.maxBuy = new Decimal(0);
    }
  }
}
