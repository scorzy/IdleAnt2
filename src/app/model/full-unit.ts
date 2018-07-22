import uniq from "lodash-es/uniq";
import { Action } from "./action";
import { BuyAction } from "./actions/buy-action";
import { TeamAction } from "./actions/team-action";
import { TwinAction } from "./actions/twin-action";
import { AutoBuy } from "./autoBuy/auto-buy";
import { BaseUnit } from "./baseUnit";
import { IUnlocable } from "./iunlocable";
import { Malus } from "./malus";
import { Prestige } from "./prestige/prestige";
import { Price } from "./price";
import { Production } from "./production";
import { ProductionBonus } from "./production-bonus";
import { Research } from "./research";

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

  //  Increase production of this unit by other unit
  productionsBonus = new Array<ProductionBonus>();

  productionsEfficienty = new Array<ProductionBonus>();
  productionsAll = new Array<ProductionBonus>();

  malus: Malus = null;
  winNonLiner = true;

  //#region Prestige
  follower: Prestige;
  followerQuantity = new Decimal(5);
  hasAutoBuyer = true;
  autoBuyerTime = 5;
  autoBuyerPrice = 10;
  //#endregion

  tempA = new Decimal(0);
  tempB = new Decimal(0);
  tempC = new Decimal(0);

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
      this.unitGroup.selected = uniq(this.unitGroup.selected);
    }
  }
  isActive(): boolean {
    return this.unlocked && this.efficiency > 0 && this.quantity.gt(0);
  }
  isStopped(): boolean {
    return this.efficiency < 0.01;
  }
  addProducer(producer: FullUnit, rateo: Decimal = new Decimal(1)) {
    const prod = new Production(producer, this, rateo);
    this.producedBy.push(prod);
    producer.produces.push(prod);
  }
  reloadTeamBonus(teamBonus = false) {
    this.bonus = new Decimal(0);

    if (teamBonus && this.buyAction) {
      this.bonus = this.buyAction.quantity.times(this.boughtBonus);
      if (this.teamAction) {
        this.bonus = this.bonus.times(this.teamAction.quantity.plus(1));
      }
    }
  }
  // setUiValue() {
  //   super.setUiValue();
  //   if (this.uiA.cmp(this.a) !== 0) this.uiA = this.a;
  //   if (this.uiB.cmp(this.b) !== 0) this.uiB = this.b;
  //   if (this.uiC.cmp(this.c) !== 0) this.uiC = this.c;
  // }

  reset() {
    super.reset();
    this.unlocked = false;
    this.efficiency = 100;

    this.a = new Decimal(0);
    this.b = new Decimal(0);
    this.c = new Decimal(0);

    if (this.buyAction) this.buyAction.reset();
    if (this.teamAction) this.teamAction.reset();
    if (this.twinAction) this.twinAction.reset();
  }
  //#region Save and Restore
  getSave(): any {
    const save = super.getSave();
    if (this.unlocked) save.u = this.unlocked;
    if (this.actions) save.a = this.actions.map(a => a.getSave());
    if (this.efficiency < 100) save.e = this.efficiency;
    if (this.isNew) save.n = true;
    return save;
  }
  restore(data: any): boolean {
    if (!("i" in data && data.i === this.id)) return false;

    if ("q" in data) this.quantity = new Decimal(data.q);

    if (this.actions && "a" in data) {
      for (const s of data.a) this.actions.find(a => a.id === s.i).restore(s);
    }

    this.unlocked = !!data.u;

    if ("e" in data) this.efficiency = data.e;
    if ("n" in data) this.isNew = data.n;

    return true;
  }
  //#endregion
}
