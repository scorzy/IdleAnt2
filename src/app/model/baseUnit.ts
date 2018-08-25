import isArray from "lodash-es/isArray";
import sample from "lodash-es/sample";
import { ProductionBonus } from "./production-bonus";
import { STRINGS } from "./strings";
import { UnitGroup } from "./unit-group";

export class BaseUnit {
  unlocked = true;
  unitGroup: UnitGroup;

  usedForProductionBonus = new Array<ProductionBonus>();

  // uiQuantity = new Decimal(0);

  constructor(
    public id: string,
    public name: string = "",
    public description: string = "",
    public quantity: Decimal = new Decimal(0)
  ) {
    if (id in STRINGS.units) {
      this.name = STRINGS.units[id][0];
      this.getRandomDescription();
    }
  }

  getRandomDescription() {
    this.description = isArray(STRINGS.units[this.id][1])
      ? sample(STRINGS.units[this.id][1])
      : STRINGS.units[this.id][1];
  }

  reset() {
    this.quantity = new Decimal(0);
    // this.uiQuantity = new Decimal(0);
  }

  //Region Save and Restore
  getSave(): any {
    const data: any = {
      i: this.id
    };
    if (!this.quantity.eq(0)) data.q = this.quantity;
    return data;
  }

  restore(data: any): boolean {
    if (!("i" in data && data.i === this.id)) return false;
    if ("q" in data) this.quantity = new Decimal(data.q);

    return true;
  }
  //Endregion
}
