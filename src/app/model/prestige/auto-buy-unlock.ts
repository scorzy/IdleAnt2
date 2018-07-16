import { PrestigeGroup } from "./prestige-group";
import { Game } from "../game";
import { Prestige } from "./prestige";

export class AutoBuyUnlock extends PrestigeGroup {
  autoBuyQuantity: Prestige;
  autoBuyTeam: Prestige;
  autoBuyTwin: Prestige;

  constructor() {
    super("autoB", "Auto Buyers");
  }
  declareStuff(game: Game) {
    this.autoBuyQuantity = new Prestige("auBQ", game.genExperiencePrice(50));
    this.autoBuyTeam = new Prestige("auBTeam", game.genExperiencePrice(100));
    this.autoBuyTwin = new Prestige("auBTwin", game.genExperiencePrice(200));
    this.list.push(this.autoBuyQuantity, this.autoBuyTeam, this.autoBuyTwin);
    this.list.forEach(a => {
      a.limit = new Decimal(1);
      a.isLimited = true;
      a.toUnlock = [game.tabs.autoBuy];
    });
  }
}
