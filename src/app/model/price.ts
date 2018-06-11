import { Utility } from "./utility";
import { FullUnit } from "./full-unit";
import { BaseUnit } from "./baseUnit";

export class Price {
  canBuy = false;
  maxBuy = new Decimal(0);

  priceUser = new Decimal(0);
  userCanBuy = false;
  avIn = new Decimal(0);

  constructor(
    public base: FullUnit,
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
    let price: Decimal;
    if (this.growRate === 1) {
      price = toBuy.times(this.price);
    } else {
      price = Decimal.sumGeometricSeries(
        toBuy,
        this.price,
        this.growRate,
        start
      );
    }
    this.base.quantity = this.base.quantity.minus(price);
  }

  loadPriceUser(num: Decimal, start: Decimal) {
    if (this.growRate > 1) {
      this.priceUser = Decimal.sumGeometricSeries(
        num,
        this.price,
        this.growRate,
        start
      );
    } else {
      this.priceUser = this.price.times(num);
    }
    this.userCanBuy = this.priceUser.lt(this.base.quantity);
  }

  getTime(): Decimal {
    if (this.priceUser.lte(this.base.quantity)) return new Decimal(0);
    else {
      this.avIn = Utility.solveEquation(
        this.base.a,
        this.base.b,
        this.base.c,
        this.base.quantity.minus(this.priceUser)
      )
        .filter(s => s.gte(0))
        .reduce((p, c) => p.min(c), new Decimal(Number.POSITIVE_INFINITY));
      return this.avIn;
    }
  }
}
