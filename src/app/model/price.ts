import { solveEquation } from "ant-utils";
import { FullUnit } from "./full-unit";

export class Price {
  canBuy = false;
  maxBuy = new Decimal(0);

  priceUser = new Decimal(0);
  userCanBuy = false;
  avIn = new Decimal(0);

  //  Price with malus
  realPrice = new Decimal(0);

  completedPercent: number = 0;
  price: Decimal;

  constructor(
    public base: FullUnit,
    price: Decimal | number,
    public growRate = 1.1
  ) {
    this.price = new Decimal(price);
    this.realPrice = new Decimal(this.price);
  }

  reloadRealPrice() {
    this.realPrice = this.base.malus
      ? this.price.times(this.base.malus.priceMultiplier)
      : (this.realPrice = this.price);
  }
  reload(bought: Decimal = new Decimal(0)) {
    this.reloadRealPrice();
    if (this.growRate !== 1) {
      this.maxBuy = Decimal.affordGeometricSeries(
        this.base.quantity,
        this.realPrice,
        this.growRate,
        bought
      );
    } else {
      this.maxBuy = this.base.quantity.gt(0)
        ? this.base.quantity.div(this.realPrice).floor()
        : new Decimal(0);
    }

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
    // this.base.setUiValue();
  }
  loadPriceUser(num: Decimal, start: Decimal) {
    const tempPrice: Decimal =
      this.growRate > 1
        ? Decimal.sumGeometricSeries(num, this.realPrice, this.growRate, start)
        : this.realPrice.times(num);

    this.userCanBuy = tempPrice.lte(this.base.quantity);
    if (this.priceUser.cmp(tempPrice) !== 0) this.priceUser = tempPrice;
  }
  getPriceForOne(start: Decimal) {
    const num = new Decimal(1);
    return this.growRate > 1
      ? Decimal.sumGeometricSeries(num, this.realPrice, this.growRate, start)
      : this.realPrice.times(num);
  }
  getTime(): Decimal {
    if (this.priceUser.lte(this.base.quantity)) return new Decimal(0);
    else {
      this.avIn = solveEquation(
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
  reloadPercent() {
    this.completedPercent = Math.floor(
      this.canBuy
        ? 100
        : this.base.quantity
            .times(100)
            .div(this.price)
            .toNumber()
    );
  }
}
