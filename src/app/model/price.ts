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
    this.maxBuy = Decimal.affordGeometricSeries(this.base.quantity, this.price, this.growRate, bought).floor();
    this.canBuy = this.maxBuy.gte(1);
  }
  buy(number: Decimal, start: Decimal) {
    const price = Decimal.sumGeometricSeries(number, this.price, this.growRate, start);
    this.base.quantity = this.base.quantity.minus(price);
  }

}
