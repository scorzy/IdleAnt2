import { FullUnit } from "./full-unit";

export class Production {
  prodPerSec = new Decimal(1);

  constructor(
    public producer: FullUnit,
    public product: FullUnit,
    public rateo = new Decimal(1)
  ) {
    this.reloadProdPerSec();
  }

  reloadProdPerSec(teamBonus = false) {
    if (this.producer.efficiency <= 0) {
      this.prodPerSec = new Decimal(0);
    } else {
      let bonus = new Decimal(1);
      //  Base Production
      this.prodPerSec = new Decimal(this.rateo);

      // Team Bonus
      if (teamBonus && this.producer.buyAction) {
        this.prodPerSec = this.prodPerSec.times(this.producer.bonus.plus(1));
      }

      //  Producer Bonus All
      const producerAllBonus = this.producer.productionsAll
        .filter(bn => bn.isActive())
        .map(prod => prod.getBonus())
        .reduce((p, n) => p.plus(n), new Decimal(0));
      bonus = bonus.plus(producerAllBonus);

      // Producer Efficienty Bonus
      if (this.rateo.gt(0)) {
        const producerBonus = this.producer.productionsEfficienty
          .filter(bn => bn.isActive())
          .map(prod => prod.getBonus())
          .reduce((p, n) => p.plus(n), new Decimal(0));
        bonus = bonus.plus(producerBonus);
      }

      // Production bonus of product
      const productBonus = this.product.productionsBonus
        .filter(bn => bn.isActive())
        .map(prod => prod.getBonus())
        .reduce((p, n) => p.plus(n), new Decimal(0));
      bonus = bonus.plus(productBonus);

      this.prodPerSec = this.prodPerSec.times(bonus);

      // Efficienty slider
      this.prodPerSec = this.prodPerSec.times(this.producer.efficiency / 100);
    }
  }
}
