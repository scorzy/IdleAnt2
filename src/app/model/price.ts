import { BaseUnit } from "./baseUnit";

export class Price {

  canBuy = false;
  maxBuy = new Decimal(0);

  constructor(
    public base: BaseUnit,
    public price: Decimal,
    public growRate: number = 1.1) {
  }

  reload(bought: Decimal) {
    this.maxBuy = Decimal.affordGeometricSeries(this.base.quantity, this.price, this.growRate, bought);
    this.canBuy = this.maxBuy.gte(1);
  }

}
