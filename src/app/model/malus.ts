import { FullUnit } from "./full-unit";

export class Malus extends FullUnit {
  isKilled = false;
  priceMultiplier = new Decimal(1);
  first = false;

  kill(): boolean {
    if (this.isKilled) return false;

    this.isKilled = true;
    this.efficiency = 0;

    //  Recursive kill malus
    this.producedBy.forEach(p => {
      if (p.producer instanceof Malus) p.producer.kill();
    });

    //  ToDo

    return true;
  }
  reloadPriceMulti() {
    if (!this.first) return;

    this.priceMultiplier =
      this.quantity.gte(11) && this.isActive()
        ? new Decimal(this.quantity.log10())
        : (this.priceMultiplier = new Decimal(1));
  }
  isActive(): boolean {
    return !this.isKilled && super.isActive();
  }

  //#region Save and Restore
  getSave(): any {
    const save = super.getSave();
    save.ik = this.isKilled;
    return save;
  }
  restore(data: any): boolean {
    if (super.restore(data)) {
      if ("ik" in data) this.isKilled = data.ik;

      return true;
    } else {
      return false;
    }
  }
  //#endregion
}
