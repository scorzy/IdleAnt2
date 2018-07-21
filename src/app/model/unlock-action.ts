import { Action } from "./action";
import { IUnlocable } from "./iunlocable";
import { Price } from "./price";

export class UnlockAction extends Action {
  constructor(
    id: string,
    name: string,
    description: string,
    prices: Price[] = null,
    public toUnlock: IUnlocable[]
  ) {
    super(id, name, description, prices);
  }
  buy(toBuy = new Decimal(1)): boolean {
    const prev = this.done;
    const ret = super.buy(toBuy);
    if (!prev && ret) {
      this.toUnlock.forEach(u => u.unlock());
    }
    return ret;
  }
}
