import { Action } from "../action";
import { Price } from "../price";
import { FullUnit } from "../full-unit";
import { BuyAction } from "./buy-action";

export class TwinAction extends Action {
  constructor(prices: Price[], private unit: FullUnit) {
    super(
      "twin",
      "Twin",
      "Hatch more " + unit.name + " for the same price. Twin is retroactive.",
      prices
    );
  }
  /**
   * On buy add unit retroactively
   * @param toBuy
   */
  public buy(toBuy = new Decimal(1)): boolean {
    if (super.buy(toBuy)) {
      this.unit.quantity = this.unit.quantity.plus(
        this.unit.buyAction.quantity.times(toBuy)
      );
      return true;
    } else {
      return false;
    }
  }
}
