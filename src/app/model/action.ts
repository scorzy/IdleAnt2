import { BaseUnit } from "./baseUnit";
import { Price } from "./price";
import { isNumber } from "util";

export class Action extends BaseUnit {
  public done = false;
  public isLimited = false;
  public limit = new Decimal(Number.POSITIVE_INFINITY);
  public complete = false;

  public canBuy = false;
  public maxBuy = new Decimal(0);

  public userNum: number;
  public realNum = new Decimal(1);

  constructor(
    id: string,
    name: string,
    description: string,
    public prices: Price[] = null
  ) {
    super(id, name, description, new Decimal(0));
  }

  public reload() {
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

  public buy(toBuy = new Decimal(1)): boolean {
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

  public reloadUserPrices() {
    let real = 1;
    if (!isNaN(this.userNum) && this.userNum >= 1) real = this.userNum;
    this.realNum = new Decimal(real);
    this.prices.forEach(p =>
      p.loadPriceUser(new Decimal(this.realNum), this.quantity)
    );
  }

  public getSave(): any {
    const save = super.getSave();
    save.d = this.done;
    save.c = this.complete;
    return save;
  }

  public restore(data: any): boolean {
    if (super.restore(data)) {
      this.done = !!data.d;
      this.complete = !!data.c;

      return true;
    } else {
      return false;
    }
  }
}
