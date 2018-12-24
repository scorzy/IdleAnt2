import { isNumber } from "lodash-es";
import { Action } from "../action";
import { FullUnit } from "../full-unit";
import { Prestige } from "../prestige/prestige";
import { Price } from "../price";
import { AutoBuyManager } from "./auto-buy-manager";

export const DELAY_LEVEL = 0.6;
export const MIN_DELAY = 1;

export class AutoBuy extends Prestige {
  active = true;
  priority = 0;
  current = 0;

  startMax = 5;
  max = 5;
  multiBuy = new Decimal(1);
  priceSavePercent = 1;

  constructor(
    public action: Action,
    price: Price[],
    public autoBuyManager: AutoBuyManager,
    public unit: FullUnit = null
  ) {
    super("au-" + action.id + (unit ? "_" + unit.id : ""), price, action.name);
  }

  isActive(): boolean {
    return (
      this.quantity.gt(0) &&
      this.active &&
      (!this.unit || this.unit.unlocked) &&
      this.action.checkResearch()
    );
  }
  buy(toBuy = new Decimal(1)): boolean {
    const original = new Decimal(this.quantity);
    const result = super.buy(toBuy);
    this.reloadLevel();
    if (result && original.lt(1)) this.autoBuyManager.buildActiveList();

    return result;
  }
  reloadLevel() {
    if (this.quantity.gt(0)) {
      this.max =
        Math.round(
          this.startMax *
            Math.pow(DELAY_LEVEL, this.quantity.toNumber() - 1) *
            100
        ) / 100;
      if (this.max < MIN_DELAY) {
        this.multiBuy = Decimal.pow(
          1 / DELAY_LEVEL,
          this.quantity.toNumber() -
            1 -
            Math.floor(
              Math.log(MIN_DELAY / this.startMax) / Math.log(DELAY_LEVEL)
            )
        ).ceil();
        this.max = MIN_DELAY;
      } else {
        this.multiBuy = new Decimal(1);
      }
    } else {
      this.max = this.startMax;
    }
  }

  update(time = 0) {
    if (!this.active || !this.isActive()) return;

    this.current = this.current + time / 1000;
    this.action.reload();
    if (
      isNumber(this.priceSavePercent) &&
      this.priceSavePercent <= 1 &&
      this.priceSavePercent > 0
    ) {
      this.action.maxBuy = this.action.maxBuy.times(this.priceSavePercent);
      this.canBuy = this.action.maxBuy.gte(1);
    } else {
      this.canBuy = false;
    }
    const max = this.multiBuy.min(this.action.maxBuy);
    if (this.current >= this.max && this.canBuy && this.action.buy(max)) {
      this.current = 0;
    }
  }

  //#region Save and Load
  getSave(): any {
    const save = super.getSave();
    save.a_p = this.active;
    save.a_i = this.priority;
    save.a_c = this.current;
    if (this.priceSavePercent !== 1) save.a_s = this.priceSavePercent;
    return save;
  }

  restore(data: any): boolean {
    if (super.restore(data)) {
      this.active = !!data.a_p;
      if ("a_i" in data) this.priority = data.a_i;
      if ("a_c" in data) this.current = data.a_c;
      if ("a_s" in data) this.priceSavePercent = data.a_s;

      this.reloadLevel();
      return true;
    } else {
      return false;
    }
  }
  //#endregion
}
