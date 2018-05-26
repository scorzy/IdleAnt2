import { FullUnit } from "./full-unit";

export class Production {
  prodPerSec = new Decimal(1);
  constructor(
    public prductor: FullUnit,
    public product: FullUnit,
    public rateo = new Decimal(1)
  ) {
    this.reloadProdPerSec();
  }

  reloadProdPerSec() {
    this.prodPerSec = new Decimal(this.rateo);
    if (this.prductor.buyAction) {
      const boughtBonus = this.prductor.buyAction.quantity.times(
        1 + this.prductor.boughtBonus
      );
      this.prodPerSec = this.prodPerSec.times(boughtBonus);
    }
  }
}
