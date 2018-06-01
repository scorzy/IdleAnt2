import { BaseUnit } from "./baseUnit";
import { Action } from "./action";
import { IUnlocable } from "./iunlocable";
import { Price } from "./price";
import { BuyAction } from "./buy-action";
import { Production } from "./production";
import { UnitGroup } from "./unit-group";
import { UnlockAction } from "./unlock-action";
import { ThrowStmt } from "@angular/compiler";

export class FullUnit extends BaseUnit implements IUnlocable {
  unlocked = false;
  actions = new Array<Action>();

  buyAction: Action;

  efficiency = 100;

  a = new Decimal(0);
  b = new Decimal(0);
  c = new Decimal(0);

  // hasA = false;
  // hasB = false;
  // hasC = false;

  producedBy = Array<Production>();
  produces = Array<Production>();

  endIn = Number.POSITIVE_INFINITY;

  boughtBonus = 0.005;
  isNew = false;
  isEnding = false;

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
    if (this.unlocked) return;

    this.unlocked = true;
    this.isNew = true;
    this.produces.forEach(u => u.product.unlock());
    if (this.unitGroup) this.unitGroup.check();
  }

  isActive(): boolean {
    return this.unlocked && this.efficiency > 0 && this.quantity.gt(0);
  }

  isStopped(): boolean {
    return this.efficiency < 0.01;
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
      u: this.unlocked
    };
    if (this.actions) save.a = this.actions.map(a => a.getSave());
    if (this.efficiency < 100) save.e = this.efficiency;
    if (this.isNew) save.n = true;
    return save;
  }
  public restore(data: any): boolean {
    if (!("i" in data && data.i === this.id)) return false;

    if ("q" in data) this.quantity = new Decimal(data.q);

    if (this.actions && "a" in data)
      for (const s of data.a) this.actions.find(a => a.id === s.i).restore(s);

    this.unlocked = !!data.u;

    if ("e" in data) this.efficiency = data.e;
    if ("n" in data) this.isNew = data.n;

    return true;
  }
  //#endregion
}
