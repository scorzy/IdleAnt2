import { IUnlocable } from "./iunlocable";
import { Action } from "./action";
import { Price } from "./price";
import { Researches } from "./units/researches";
import { STRINGS } from "./strings";
import { FullUnit } from "./full-unit";

export class Research extends Action implements IUnlocable {
  unlocked = false;
  toUnlock = new Array<IUnlocable>();

  constructor(id: string, public researches: Researches) {
    super(id, "", "");
    if (id in STRINGS.researches) {
      this.name = STRINGS.researches[id][0];
      this.description = STRINGS.researches[id][1];
    }
    this.limit = new Decimal(1);
    this.isLimited = true;
    this.userNum = 1;
    this.researches.researches.push(this);
  }
  genPrice(price: Decimal, science: FullUnit) {
    this.prices = [new Price(science, price, 1)];
  }
  buy(toBuy = new Decimal(1)): boolean {
    if (super.buy(toBuy)) {
      if (this.toUnlock)
        this.toUnlock.filter(i => !i.unlocked).forEach(u => u.unlock());
      this.researches.reloadLists();
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
  reset() {
    super.reset();
    this.unlocked = false;
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
