import { BugTypes } from "../bugsTypes";
import { CONSTS } from "../CONSTATS";
import { Game } from "../game";
import { Helper } from "../helper";
import { Price } from "../price";
import { ProductionBonus } from "../production-bonus";
import { Research } from "../research";
import { UnitGroup } from "../unit-group";
import { World } from "../world";

export class Helpers extends UnitGroup {
  leafCutter: Helper;
  majorHelperRes: Research;

  constructor(game: Game) {
    super("Heplers", game);
  }
  declareStuff(): void {
    this.leafCutter = new Helper("lf", 0.1);

    this.addUnits([this.leafCutter]);
    this.majorHelperRes = new Research("sm", this.game.researches);
  }
  setRelations(): void {
    this.leafCutter.generateBuyAction([
      new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_1),
      new Price(this.game.materials.soil, CONSTS.PRICE_1)
    ]);
    this.game.addTwinAction(this.leafCutter, CONSTS.TWIN_PRICE_1);
    this.game.materials.food.addProducer(this.leafCutter, CONSTS.CONSUME_1);
    this.game.materials.soil.addProducer(this.leafCutter, CONSTS.CONSUME_1);

    this.game.materials.food.productionsBonus.push(this.leafCutter.helpBonus);

    this.leafCutter.setBugType(BugTypes.SUPER_MAJOR);

    this.game.researches.team2.toUnlock.push(this.majorHelperRes);
    this.majorHelperRes.prices = this.game.genSciencePrice(1e4);
    this.majorHelperRes.toUnlock = this.list.filter(
      u => u.bugType === BugTypes.SUPER_MAJOR
    );
    this.majorHelperRes.bugType = BugTypes.SUPER_MAJOR;
  }
  addWorlds() {
    const majorPre = new World("majorPre");
    const majorSuff = new World("majorSuff");
    [majorPre, majorSuff].forEach(w => {
      w.additionalBugs.push(BugTypes.SUPER_MAJOR);
    });
    World.prefix.push(majorPre);
    World.suffix.push(majorSuff);
  }
}
