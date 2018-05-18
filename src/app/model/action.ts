import { BaseUnit } from "./baseUnit";
import { Price } from "./price";

export class Action extends BaseUnit {

  done = false;
  limit = new Decimal(Number.POSITIVE_INFINITY);
  complete = false;

  canBuy = false;
  maxBuy = new Decimal(0);

  constructor(
    id: string,
    name: string,
    description: string,
    public prices: Array<Price> = null
  ) {
    super(id, name, description, new Decimal(0));
  }

  reload() {
    this.prices.forEach(p => p.reload(this.quantity));
    this.maxBuy = this.prices.map(p => p.maxBuy)
      .reduce((p, c) => p.min(c), new Decimal(Number.POSITIVE_INFINITY))
      .min(this.limit.minus(this.quantity));
    this.canBuy = this.maxBuy.gte(1);

  }

  buy(number = new Decimal(1)): boolean {
    this.reload();
    if (this.canBuy && this.maxBuy.gte(number)) {
      this.prices.forEach(p => p.buy(number, this.quantity));

      this.reload();
      return true;
    } else {
      return false;
    }
  }

  getSave(): any {
    const save = super.getSave();
    save.d = this.done;
    save.c = this.complete;
    return save;
  }

  restore(data: any): boolean {
    if (super.restore(data)) {
      if ("d" in data) { this.done = data.d; }
      if ("c" in data) { this.complete = data.c; }
      return true;
    } else {
      return false;
    }
  }
}
