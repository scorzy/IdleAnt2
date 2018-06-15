import { Action } from "./action";
import { UnitGroup } from "./unit-group";
import { STRINGS } from "./strings";

export class BaseUnit {
  unlocked = true;
  unitGroup: UnitGroup;

  constructor(
    public id: string,
    public name: string = "",
    public description: string = "",
    public quantity: Decimal = new Decimal(0)
  ) {
    if (id in STRINGS.units) {
      this.name = STRINGS.units[id][0];
      this.description = STRINGS.units[id][1];
    }
  }

  //Region Save and Restore
  getSave(): any {
    return {
      i: this.id,
      q: this.quantity
    };
  }

  restore(data: any): boolean {
    if (!("i" in data && data.i === this.id)) return false;

    if ("q" in data) this.quantity = new Decimal(data.q);

    return true;
  }
  //Endregion
}
