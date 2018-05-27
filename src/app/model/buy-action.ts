import { Action } from "./action";
import { FullUnit } from "./full-unit";
import { Price } from "./price";
import { IUnlocable } from "./iunlocable";

export class BuyAction extends Action {
  constructor(
    prices: Price[],
    public unit: FullUnit,
    public toUnlock: IUnlocable[] = null
  ) {
    super("buy", "Hach", "Get more units", prices);
  }
  public buy(toBuy = new Decimal(1)): boolean {
    if (super.buy(toBuy)) {
      this.unit.quantity = this.unit.quantity.plus(toBuy);
      if (this.toUnlock) this.toUnlock.forEach(u => u.unlock());
    } else {
      return false;
    }
  }
}
