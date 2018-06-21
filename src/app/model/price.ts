import { Utility } from "./utility";
import { FullUnit } from "./full-unit";
import { WorldMalus } from "./units/world-malus";
import { Materials } from "./units/materials";

export class Price {
  canBuy = false;
  maxBuy = new Decimal(0);

  priceUser = new Decimal(0);
  userCanBuy = false;
  avIn = new Decimal(0);

  //  Price with malus
  realPrice = new Decimal(0);

  constructor(
    public base: FullUnit,
    public price: Decimal,
    public growRate = 1.1
  ) {
    this.realPrice = new Decimal(this.price);
  }

  reloadRealPrice() {
    this.realPrice = this.base.malus
      ? this.price.times(this.base.malus.priceMultiplier)
      : (this.realPrice = this.price);
  }

  reload(bought: Decimal) {
    this.reloadRealPrice();
    if (this.growRate !== 1)
      this.maxBuy = Decimal.affordGeometricSeries(
        this.base.quantity,
        this.realPrice,
        this.growRate,
        bought
      );
    else this.maxBuy = this.base.quantity.div(this.realPrice).floor();

    this.canBuy = this.maxBuy.gte(1);
  }
  buy(toBuy: Decimal, start: Decimal) {
    let price: Decimal;
    if (this.growRate === 1) {
      price = toBuy.times(this.realPrice);
    } else {
      price = Decimal.sumGeometricSeries(
        toBuy,
        this.realPrice,
        this.growRate,
        start
      );
    }
    this.base.quantity = this.base.quantity.minus(price);
    this.base.setUiValue();
  }

  loadPriceUser(num: Decimal, start: Decimal) {
    const tempPrice: Decimal =
      this.growRate > 1
        ? Decimal.sumGeometricSeries(num, this.realPrice, this.growRate, start)
        : this.realPrice.times(num);

    this.userCanBuy = tempPrice.lte(this.base.quantity);
    if (this.priceUser.cmp(tempPrice) !== 0) this.priceUser = tempPrice;
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
