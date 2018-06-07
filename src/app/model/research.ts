import { IUnlocable } from "./iunlocable";
import { Action } from "./action";
import { Price } from "./price";
import { Researchs } from "./units/researchs";
import { STRINGS } from "./strings";
import { FullUnit } from "./full-unit";

export class Research extends Action implements IUnlocable {
  unlocked = false;
  public toUnlock = new Array<IUnlocable>();

  constructor(id: string, public researchs: Researchs) {
    super(id, "", "");
    if (id in STRINGS.researchs) {
      this.name = STRINGS.researchs[id][0];
      this.description = STRINGS.researchs[id][1];
    }
    this.limit = new Decimal(1);
    this.isLimited = true;
    this.userNum = 1;
    this.researchs.researchs.push(this);
  }
  genPrice(price: Decimal, science: FullUnit) {
    this.prices = [new Price(science, price, 1)];
  }
  buy(toBuy = new Decimal(1)): boolean {
    if (super.buy(toBuy)) {
      if (this.toUnlock)
        this.toUnlock.filter(i => !i.unlocked).forEach(u => u.unlock());
      this.researchs.reloadLists();
      return true;
    } else {
      return false;
    }
  }
  unlock() {
    if (!this.unlocked) {
      this.unlocked = true;
      this.reload();
      return true;
    } else {
      return false;
    }
  }
  //#region Save and Load
  getSave(): any {
    const save = super.getSave();
    save.u = this.unlocked;
    return save;
  }
  restore(data: any): boolean {
    if (super.restore(data)) {
      if ("u" in data) this.unlocked = data.u;
      return true;
    } else {
      return false;
    }
  }
  //#endregion
}
