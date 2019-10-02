import uniq from "lodash-es/uniq";
import { Action } from "./action";
import { BuyAction } from "./actions/buy-action";
import { TeamAction } from "./actions/team-action";
import { TwinAction } from "./actions/twin-action";
import { BaseUnit } from "./baseUnit";
import { BUGS, BugTypes, Tags } from "./bugsTypes";
import { IUnlocable } from "./iunlocable";
import { Malus } from "./malus";
import { Prestige } from "./prestige/prestige";
import { Price } from "./price";
import { Production } from "./production";
import { ProductionBonus } from "./production-bonus";

export class FullUnit extends BaseUnit implements IUnlocable {
  unlocked = false;
  actions = new Array<Action>();
  bugType = BugTypes.ANT;

  buyAction: BuyAction;
  teamAction: TeamAction;
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

  productionsEfficiency = new Array<ProductionBonus>();
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

  tags = new Array<Tags>();

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
  generateTeamAction(price: Price[]) {
    this.teamAction = new TeamAction(price);
    this.actions.push(this.teamAction);
  }
  generateTwinAction(price: Price[]) {
    this.twinAction = new TwinAction(price, this);
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
    return (
      this.unlocked && this.efficiency > Number.EPSILON && this.quantity.gt(0)
    );
  }
  isStopped(): boolean {
    return this.efficiency < 0.01;
  }
  addProducer(producer: FullUnit, ratio: Decimal | number = 1) {
    ratio = new Decimal(ratio);
    const prod = new Production(producer, this, ratio);
    this.producedBy.push(prod);
    producer.produces.push(prod);
  }
  reloadTeamBonus(teamBonus = false, multiBonus: Decimal) {
    this.bonus = new Decimal(0);

    if (teamBonus && this.buyAction) {
      this.bonus = this.buyAction.quantity.times(this.boughtBonus);
      if (this.teamAction) {
        this.bonus = this.bonus.times(this.teamAction.quantity.plus(1));
      }
      this.bonus = this.bonus.times(multiBonus);
    }
  }
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
  setBugType(bug: BugTypes) {
    this.bugType = bug;
    if (!(bug in BUGS)) return;
    const bugClass = BUGS[bug];

    if (this.buyAction && bugClass.priceMulti !== 1) {
      this.buyAction.prices
        .filter(p => p.price.gt(1))
        .forEach(p => {
          p.price = p.price.times(bugClass.priceMulti);
        });
    }
    if (this.produces.length > 0 && bugClass.prodMulti !== 1) {
      this.produces.forEach(p => {
        p.ratio = p.ratio.times(bugClass.prodMulti);
      });
    }
    if (this.produces.length > 0 && bugClass.efficiencyMulti !== 1) {
      this.produces
        .filter(p => p.ratio.gt(0))
        .forEach(p => {
          p.ratio = p.ratio.times(bugClass.efficiencyMulti);
        });
    }
    if (this.teamAction && bugClass.teamPriceMulti !== 1) {
      this.teamAction.prices.forEach(p => {
        p.price = p.price.times(bugClass.teamPriceMulti);
      });
    }
    if (this.twinAction && bugClass.twinPriceMulti !== 1) {
      this.twinAction.prices.forEach(p => {
        p.price = p.price.times(bugClass.twinPriceMulti);
      });
    }
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
