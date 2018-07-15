import { AutoBuy } from "./auto-buy";
import { FullUnit } from "../full-unit";
import { Game } from "../game";

export class AutoBuyManager {
  allAutoBuyer = new Array<AutoBuy>();
  activeAutoBuy = new Array<AutoBuy>();

  update() {
    this.activeAutoBuy.forEach(a => a.update());
  }
  buildActiveList() {
    this.activeAutoBuy = this.allAutoBuyer
      .filter(a => a.isActive())
      .sort((a, b) => a.priority - b.priority);
  }
  createFromUnit(unit: FullUnit, game: Game) {
    unit.actions.forEach(a => {
      const auto = new AutoBuy(
        a,
        game.genExperiencePrice(unit.autoBuyerPrice * a.autoBuyPriceMulti),
        this,
        unit
      );
      auto.startMax = unit.autoBuyerTime * a.autoBuyTimeMulti;
      this.allAutoBuyer.push(auto);
      a.autoBuyer = auto;
    });
  }
  //#region Save and Load
  getSave(): any {
    return { autList: this.allAutoBuyer.map(a => a.getSave()) };
  }
  restore(data: any): boolean {
    if ("autList" in data) {
      for (const a of data.autList)
        this.allAutoBuyer.find(u => u.id === a.i).restore(a);
      this.buildActiveList();
    } else {
      return false;
    }
  }
  //#endregion
}
