import { Action } from "./action";
import { FullUnit } from "./full-unit";
import { Price } from "./price";

export class BuyAction extends Action {
  constructor(prices: Price[], public unit: FullUnit) {
    super("buy", "Hach", "Get more units", prices);
  }
  public buy(toBuy = new Decimal(1)): boolean {
    if (super.buy(toBuy)) {
      this.unit.quantity = this.unit.quantity.plus(toBuy);
    } else {
      return false;
    }
  }
}
