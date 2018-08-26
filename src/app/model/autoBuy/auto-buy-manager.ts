import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { BuyResearch } from "./../actions/buy-research";
import { AutoBuy, MIN_DELAY } from "./auto-buy";

export class AutoBuyManager {
  allAutoBuyer = new Array<AutoBuy>();
  activeAutoBuy = new Array<AutoBuy>();

  minuteAutoBuy: AutoBuy;
  researchAutoBuy: AutoBuy;

  enabled = true;
  multiBuy = true;

  update(time = 0) {
    if (this.enabled) this.activeAutoBuy.forEach(a => a.update(time));
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
  createSpecial(game: Game) {
    //  Minute Warp
    this.minuteAutoBuy = new AutoBuy(
      game.actMin,
      game.genExperiencePrice(100),
      this
    );
    this.minuteAutoBuy.startMax = 60 * 10;
    this.allAutoBuyer.push(this.minuteAutoBuy);

    //  Research
    this.researchAutoBuy = new AutoBuy(
      new BuyResearch(game.researches),
      game.genExperiencePrice(200),
      this
    );
    this.researchAutoBuy.startMax = 60 * 15;
    this.allAutoBuyer.push(this.researchAutoBuy);

    this.allAutoBuyer.forEach(a => a.reloadLevel());
  }
  //#region Save and Load
  getSave(): any {
    return {
      autList: this.allAutoBuyer.map(a => a.getSave()),
      ena: this.enabled,
      multi: this.multiBuy
    };
  }
  restore(data: any): boolean {
    if ("ena" in data) this.enabled = data.ena;
    if ("multi" in data) this.multiBuy = data.multi;
    if ("autList" in data) {
      for (const a of data.autList) {
        this.allAutoBuyer.find(u => u.id === a.i).restore(a);
      }
      this.buildActiveList();
    } else {
      return false;
    }
  }
  //#endregion
}
