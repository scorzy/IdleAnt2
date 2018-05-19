import { BaseUnit } from "./baseUnit";
import { Price } from "./price";

export class Action extends BaseUnit {
  public done = false;
  public isLimited = false;
  public limit = new Decimal(Number.POSITIVE_INFINITY);
  public complete = false;

  public canBuy = false;
  public maxBuy = new Decimal(0);

  constructor(
    id: string,
    name: string,
    description: string,
    public prices: Price[] = null
  ) {
    super(id, name, description, new Decimal(0));
  }

  public reload() {
    this.prices.forEach(p => p.reload(this.quantity));
    this.maxBuy = this.prices
      .map(p => p.maxBuy)
      .reduce((p, c) => p.min(c), new Decimal(Number.POSITIVE_INFINITY));
    if (this.isLimited)
      this.maxBuy = Decimal.min(this.limit.minus(this.quantity), this.maxBuy);
    this.canBuy = this.maxBuy.gte(1);
  }

  public buy(toBuy = new Decimal(1)): boolean {
    this.reload();
    if (this.canBuy && this.maxBuy.gte(toBuy)) {
      this.prices.forEach(p => p.buy(toBuy, this.quantity));
      this.quantity = this.quantity.plus(toBuy);
      this.done = true;
      if (this.isLimited && this.quantity.gte(this.limit)) this.complete = true;

      this.reload();
      return true;
    } else {
      return false;
    }
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
