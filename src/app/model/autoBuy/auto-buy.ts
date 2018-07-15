import { Action } from "../action";
import { BaseUnit } from "../baseUnit";
import { FullUnit } from "../full-unit";
import { Price } from "../price";
import { Prestige } from "../prestige/prestige";

const DELAY_LEVEL = 0.7;
const MIN_DELAY = 0.25;

export class AutoBuy extends Prestige {
  pause = false;
  priority = 0;
  current = 0;

  startMax = 5;
  max = 5;
  multiBuy = new Decimal(1);

  constructor(
    public action: Action,
    price: Price[],
    public unit: FullUnit = null
  ) {
    super("au-" + action.id + (unit ? "_" + unit.id : ""), price, action.name);
  }

  isActive(): boolean {
    return (
      !this.pause &&
      (!this.unit || this.unit.unlocked) &&
      this.action.checkResearch()
    );
  }
  buy(toBuy = new Decimal(1)): boolean {
    const result = super.buy(toBuy);
    this.reloadLevel();
    return result;
  }
  reloadLevel() {
    this.max =
      Math.round(
        this.startMax * Math.pow(DELAY_LEVEL, this.quantity.toNumber()) * 100
      ) / 100;
    if (this.max < MIN_DELAY) {
      this.multiBuy = Decimal.pow(
        2,
        this.quantity.toNumber() -
          Math.floor(
            Math.log(MIN_DELAY / this.startMax) / Math.log(DELAY_LEVEL)
          )
      );
      this.max = MIN_DELAY;
    } else {
      this.multiBuy = new Decimal(1);
    }
  }
  /**
   * Update to MIN_DELAY seconds
   * When can buy try to buy each update
   */
  update() {
    if (this.pause || (!!this.unit && !this.unit.unlocked)) return;

    this.current = this.current + MIN_DELAY;
    if (this.current >= this.max && this.action.buy(this.multiBuy)) {
      this.current = 0;
    }
  }

  //#region Save and Load
  getSave(): any {
    const save = super.getSave();
    save.a_p = this.pause;
    save.a_i = this.priority;
    save.a_c = this.current;
    return save;
  }

  restore(data: any): boolean {
    if (super.restore(data)) {
      this.pause = !!data.a_p;
      if ("a_i" in data) this.priority = data.a_i;
      if ("a_c" in data) this.current = data.a_c;

      this.reloadLevel();
      return true;
    } else {
      return false;
    }
  }
  //#endregion
}
