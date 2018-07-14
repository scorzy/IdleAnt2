import { Action } from "../action";
import { BaseUnit } from "../baseUnit";
import { FullUnit } from "../full-unit";

export class AutoBuy extends BaseUnit {
  static readonly DELAY_LEVEL = 0.7;
  static readonly DELAY_MAX = 0.25;

  pause = false;
  priority = 0;
  current = 0;

  startMax = 5;
  max = 0;
  multiBuy = 1;

  constructor(action: Action, unit: FullUnit = null) {
    super("au-" + action.id + (unit ? "_" + unit.id : ""));
  }

  reloadLevel() {
    this.max =
      this.startMax * Math.pow(AutoBuy.DELAY_LEVEL, this.quantity.toNumber());
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

      return true;
    } else {
      return false;
    }
  }
  //#endregion
}
