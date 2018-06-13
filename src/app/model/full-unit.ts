import { BaseUnit } from "./baseUnit";
import { Action } from "./action";
import { IUnlocable } from "./iunlocable";
import { Price } from "./price";
import { BuyAction } from "./actions/buy-action";
import { Production } from "./production";
import { TwinAction } from "./actions/twin-action";
import { Research } from "./research";
import { TeamAction } from "./actions/team-action";
import { ProductionBonus } from "./production-bonus";

export class FullUnit extends BaseUnit implements IUnlocable {
  unlocked = false;
  actions = new Array<Action>();

  buyAction: BuyAction;
  teamAction: Action;
  twinAction: TwinAction;

  efficiency = 100;

  a = new Decimal(0);
  b = new Decimal(0);
  c = new Decimal(0);

  producedBy = Array<Production>();
  produces = Array<Production>();

  endIn = Number.POSITIVE_INFINITY;

  boughtBonus = 0.005;
  isNew = false;
  isEnding = false;

  bonus = new Decimal(0);

  productionsBonus = new Array<ProductionBonus>();

  constructor(
    id: string,
    name: string = "",
    description: string = "",
    quantity: Decimal = new Decimal(0)
  ) {
    super(id, name, description, quantity);
  }

  generateBuyAction(prices: Price[], toUnlock: IUnlocable[] = null) {
    this.buyAction = new BuyAction(prices, this, toUnlock);
    this.actions.push(this.buyAction);
  }
  generateTeamAction(price: Price[], teamRes: Research) {
    this.teamAction = new TeamAction(price, teamRes);
    this.actions.push(this.teamAction);
  }
  generateTwinAction(price: Price[], twinRes: Research) {
    this.twinAction = new TwinAction(price, this, twinRes);
    this.actions.push(this.twinAction);
  }

  unlock() {
    if (this.unlocked) return;

    this.unlocked = true;
    this.isNew = true;
    this.produces.forEach(u => u.product.unlock());
    if (this.unitGroup) {
      this.unitGroup.check();
      this.unitGroup.selected.push(this);
    }
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

  reloadBonus(teamBonus = false) {
    this.bonus = new Decimal(0);

    if (teamBonus && this.buyAction) {
      this.bonus = this.buyAction.quantity.times(this.boughtBonus);
      if (this.teamAction)
        this.bonus = this.bonus.times(this.teamAction.quantity.plus(1));
    }
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
