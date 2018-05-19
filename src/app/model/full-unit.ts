import { BaseUnit } from "./baseUnit";
import { Action } from "./action";
import { IUnlocable } from "./iunlocable";
import { Price } from "./price";
import { BuyAction } from "./buy-action";

export class FullUnit extends BaseUnit implements IUnlocable {
  unlocked = false;
  actions = new Array<Action>();

  buyAction: Action;

  constructor(
    id: string,
    name: string,
    description: string,
    quantity: Decimal = new Decimal(0)
  ) {
    super(id, name, description, quantity);
  }

  public generateBuyAction(prices: Price[]) {
    this.buyAction = new BuyAction(prices, this);
    this.actions.push(this.buyAction);
  }

  public unlock() {
    this.unlocked = true;
  }

  //Region Save and Restore
  public getSave(): any {
    const save: any = {
      i: this.id,
      q: this.quantity,
      u: this.unlocked
    };
    if (this.actions) save.a = this.actions.map(a => a.getSave());
    return save;
  }
  public restore(data: any): boolean {
    if (!("i" in data && data.i === this.id)) return false;

    if ("q" in data) this.quantity = new Decimal(data.q);

    if (this.actions && "a" in data)
      for (const s of data.a) this.actions.find(a => a.id === s.i).restore(s);

    this.unlocked = !!data.u;

    return true;
  }
  //Endregion
}
