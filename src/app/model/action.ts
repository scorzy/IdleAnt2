import { BaseUnit } from "./baseUnit";
import { Price } from "./price";

export class Action extends BaseUnit {
  done = false;
  isLimited = false;
  limit = new Decimal(Number.POSITIVE_INFINITY);
  complete = false;

  canBuy = false;
  maxBuy = new Decimal(0);
  canUserBuy = false;

  userNum = 1;
  realNum = new Decimal(1);

  availableIn = NaN;

  constructor(
    id: string,
    name: string,
    description: string,
    public prices = new Array<Price>()
  ) {
    super(id, name, description, new Decimal(0));
  }

  reload() {
    if (this.complete) {
      this.maxBuy = new Decimal(0);
      this.canBuy = false;
    } else {
      this.prices.forEach(p => p.reload(this.quantity));
      this.maxBuy = this.prices
        .map(p => p.maxBuy)
        .reduce((p, c) => p.min(c), new Decimal(Number.POSITIVE_INFINITY));
      if (this.isLimited)
        this.maxBuy = Decimal.min(this.limit.minus(this.quantity), this.maxBuy);
      this.canBuy = this.maxBuy.gte(1);
    }
  }

  buy(toBuy = new Decimal(1)): boolean {
    this.reload();
    if (this.canBuy && this.maxBuy.gte(toBuy)) {
      this.prices.forEach(p => p.buy(toBuy, this.quantity));
      this.quantity = this.quantity.plus(toBuy);
      this.done = true;
      if (this.isLimited && this.quantity.gte(this.limit)) this.complete = true;
      this.reload();
      this.reloadUserPrices();
      return true;
    } else {
      return false;
    }
  }

  reloadUserPrices() {
    let real = 1;
    if (!isNaN(this.userNum) && this.userNum >= 1) real = this.userNum;
    this.realNum = new Decimal(real);
    this.canUserBuy = this.maxBuy.gte(this.realNum);
    this.prices.forEach(p =>
      p.loadPriceUser(new Decimal(this.realNum), this.quantity)
    );
  }
  reloadAvailableTime() {
    if (this.prices.findIndex(p => p.base.isEnding) > -1) {
      this.availableIn = NaN;
    } else {
      this.availableIn =
        this.prices
          .map(p => p.getTime())
          .reduce((p, c) => p.max(c), new Decimal(0))
          .toNumber() * 1000;
    }
  }
  reset() {
    super.reset();
    this.done = false;
    this.complete = false;
    this.canBuy = false;
    this.maxBuy = new Decimal(0);
    this.canUserBuy = false;
    this.userNum = 1;
    this.realNum = new Decimal(1);
    this.availableIn = NaN;
  }

  //#region Save and Load
  getSave(): any {
    const save = super.getSave();
    save.d = this.done;
    save.c = this.complete;
    return save;
  }

  restore(data: any): boolean {
    if (super.restore(data)) {
      this.done = !!data.d;
      this.complete = !!data.c;

      return true;
    } else {
      return false;
    }
  }
  //#endregion
}
