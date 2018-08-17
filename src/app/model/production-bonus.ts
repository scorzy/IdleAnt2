import { BaseUnit } from "./baseUnit";

export class ProductionBonus {
  constructor(public unit: BaseUnit, public quantity: Decimal) {
    unit.usedForProductionBonus.push(this);
  }
  isActive(): boolean {
    return this.unit.unlocked && this.unit.quantity.gt(0);
  }
  getBonus(): Decimal {
    if (this.isActive()) {
      return this.unit.quantity
        .times(this.quantity)
        .times(this.getMultiplier());
    } else return new Decimal(0);
  }
  getBonusPercent(): Decimal {
    return this.getBonus().times(100);
  }
  getBonusPercentForNum(num: Decimal): Decimal {
    return this.getForNum(num).times(100);
  }
  getForNum(num: Decimal): Decimal {
    return num.times(this.quantity);
  }

  getMultiplier() {
    return new Decimal(1);
  }
}
