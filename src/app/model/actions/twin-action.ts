import { Action } from "../action";
import { Price } from "../price";
import { FullUnit } from "../full-unit";
import { BuyAction } from "./buy-action";
import { Research } from "../research";

export class TwinAction extends Action {
  constructor(
    prices: Price[],
    private unit: FullUnit,
    public twinRes: Research
  ) {
    super(
      "W",
      "Twin",
      "Hatch more " + unit.name + " for the same price",
      prices
    );
    this.autoBuyPriceMulti = 2;
    this.autoBuyTimeMulti = 2;
  }
  /**
   * On buy add unit retroactively
   * @param toBuy
   */
  buy(toBuy = new Decimal(1)): boolean {
    if (super.buy(toBuy)) {
      this.unit.quantity = this.unit.quantity.plus(
        this.unit.buyAction.quantity.times(toBuy)
      );
      return true;
    } else {
      return false;
    }
  }
  reload() {
    if (this.twinRes.done) {
      super.reload();
    } else {
      this.canBuy = false;
      // this.maxBuy = new Decimal(0);
    }
  }
}
