import { BaseUnit } from "./baseUnit";
import { Action } from "./action";
import { IUnlocable } from "./iunlocable";
import { Price } from "./price";
import { BuyAction } from "./buy-action";
import { Production } from "./production";
import { UnitGroup } from "./unit-group";
import { UnlockAction } from "./unlock-action";

export class FullUnit extends BaseUnit implements IUnlocable {
  unlocked = false;
  actions = new Array<Action>();

  buyAction: Action;

  efficiency = 100;

  a = new Decimal(0);
  b = new Decimal(0);
  c = new Decimal(0);

  producedBy = Array<Production>();
  produces = Array<Production>();

  endIn = Number.POSITIVE_INFINITY;

  boughtBonus = 0.005;

  constructor(
    id: string,
    name: string,
    description: string,
    quantity: Decimal = new Decimal(0)
  ) {
    super(id, name, description, quantity);
  }

  generateBuyAction(prices: Price[], toUnlock: IUnlocable[] = null) {
    this.buyAction = new BuyAction(prices, this, toUnlock);
    this.actions.push(this.buyAction);
  }

  unlock() {
    this.unlocked = true;
    if (this.unitGroup) this.unitGroup.check();
  }

  isActive(): boolean {
    return this.unlocked && this.efficiency > 0 && this.quantity.gt(0);
  }

  addProductor(productor: FullUnit, rateo: Decimal = new Decimal(1)) {
    const prod = new Production(productor, this, rateo);
    this.producedBy.push(prod);
    productor.produces.push(prod);
  }

  //#region Save and Restore
  public getSave(): any {
    const save: any = {
      i: this.id,
      q: this.quantity,
      u: this.unlocked,
      e: this.efficiency
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

    if ("e" in data) this.efficiency = data.e;

    return true;
  }
  //#endregion
}
