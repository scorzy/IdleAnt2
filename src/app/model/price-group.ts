import { Price } from "./price";

export class PriceGroup {

  canBuy = false;
  maxBuy = new Decimal(0);

  constructor(public prices: Array<Price>) { }

  reload(bought: Decimal) {
    this.prices.forEach(p => p.reload(bought));
    this.canBuy = this.prices.findIndex(p => p.canBuy) > -1;
    this.maxBuy = this.prices.map(p => p.maxBuy).reduce((p, c) => p.min(c), new Decimal(0));
  }

}
