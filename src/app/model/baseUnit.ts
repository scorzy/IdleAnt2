export class BaseUnit {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public quantity: Decimal = new Decimal(0)
  ) { }

  getSave(): any {
    return {
      i: this.id,
      q: this.quantity
    };
  }

  restore(data: any): boolean {
    if (!("i" in data && data.i === this.id)) {
      return false;
    }
    if ("q" in data) {
      this.quantity = new Decimal(data.q);
    }

    return true;
  }
}
