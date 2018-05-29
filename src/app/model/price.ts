import { BaseUnit } from "./baseUnit";
import { Utility } from "./utility";

export class Price {
  canBuy = false;
  maxBuy = new Decimal(0);

  constructor(
    public base: BaseUnit,
    public price: Decimal,
    public growRate = 1.1
  ) {}

  reload(bought: Decimal) {
    if (this.growRate !== 1)
      this.maxBuy = Decimal.affordGeometricSeries(
        this.base.quantity,
        this.price,
        this.growRate,
        bought
      );
    else this.maxBuy = this.base.quantity.div(this.price).floor();

    this.canBuy = this.maxBuy.gte(1);
  }
  buy(toBuy: Decimal, start: Decimal) {
    const price = Decimal.sumGeometricSeries(
      toBuy,
      this.price,
      this.growRate,
      start
    );
    this.base.quantity = this.base.quantity.minus(price);
  }
}
