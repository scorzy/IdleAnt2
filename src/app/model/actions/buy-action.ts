import { Action } from "../action";
import { FullUnit } from "../full-unit";
import { IUnlocable } from "../iunlocable";
import { Price } from "../price";

export class BuyAction extends Action {
  constructor(
    prices: Price[],
    public unit: FullUnit,
    public toUnlock: IUnlocable[] = null,
    id = ""
  ) {
    super(id === "" ? "B" : id, "Hach", "", prices);
    this.autoBuyPriceMulti = 1;
  }
  buy(toBuy = new Decimal(1)): boolean {
    if (super.buy(toBuy)) {
      if (this.unit) {
        if (this.unit.twinAction) {
          toBuy = toBuy.times(this.unit.twinAction.quantity.plus(1));
        }
        this.unit.quantity = this.unit.quantity.plus(toBuy);
      }
      if (this.toUnlock) this.toUnlock.forEach(u => u.unlock());
      return true;
    } else {
      return false;
    }
  }
}
