import { IUnlocable } from "./iunlocable";
import { Action } from "./action";
import { Price } from "./price";
import { Researchs } from "./units/researchs";

export class Research extends Action implements IUnlocable {
  unlocked = false;
  public toUnlock: IUnlocable[];

  constructor(
    id: string,
    name: string,
    description: string,
    prices: Price[],
    public researchs: Researchs
  ) {
    super(id, name, description, prices);
    this.limit = new Decimal(1);
    this.isLimited = true;
  }
  buy(toBuy = new Decimal(1)): boolean {
    if (super.buy(toBuy)) {
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
