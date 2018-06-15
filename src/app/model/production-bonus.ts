import { BaseUnit } from "./baseUnit";

export class ProductionBonus {
  constructor(public unit: BaseUnit, public quantity: Decimal) {}
  isActive(): boolean {
    return this.unit.unlocked && this.unit.quantity.gt(0);
  }
  getBonus(): Decimal {
    if (this.isActive) return this.unit.quantity.times(this.quantity);
    else return new Decimal(0);
  }
}
