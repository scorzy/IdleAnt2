import { FullUnit } from "./full-unit";

export class Production {
  prodPerSec = new Decimal(1);

  constructor(
    public productor: FullUnit,
    public product: FullUnit,
    public rateo = new Decimal(1)
  ) {
    this.reloadProdPerSec();
  }

  reloadProdPerSec(teamBonus = false) {
    this.prodPerSec = new Decimal(this.rateo);

    if (teamBonus && this.productor.buyAction) {
      this.prodPerSec = this.prodPerSec.times(this.productor.bonus.plus(1));
    }
    this.prodPerSec = this.prodPerSec.times(this.productor.efficiency / 100);

    const productBonus = this.product.productionsBonus
      .filter(bn => bn.isActive())
      .map(prod => prod.getBonus())
      .reduce((p, n) => p.plus(n), new Decimal(0));

    this.prodPerSec = this.prodPerSec.times(productBonus.plus(1));
  }
}
