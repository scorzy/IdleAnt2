import { BugTypes, Tags } from "../bugsTypes";
import { CONSTS } from "../CONSTANTS";
import { Game } from "../game";
import { Helper } from "../helper";
import { Price } from "../price";
import { Research } from "../research";
import { UnitGroup } from "../unit-group";
import { World } from "../world";

export class Helpers extends UnitGroup {
  leafCutter: Helper;
  minerHelper: Helper;
  soilHelper: Helper;

  majorHelperRes: Research;

  general: Helper;
  headquarter: Helper;

  constructor(game: Game) {
    super("Helpers", game);
  }
  declareStuff(): void {
    this.leafCutter = new Helper("lf", 0.1, this.game);
    this.minerHelper = new Helper("mh", 0.1, this.game);
    this.soilHelper = new Helper("sh", 0.1, this.game);
    this.general = new Helper("HB", 0.1, this.game);
    this.headquarter = new Helper("HQ", 0.1, this.game);

    this.addUnits([
      this.leafCutter,
      this.minerHelper,
      this.soilHelper,
      this.general,
      this.headquarter
    ]);
    this.majorHelperRes = new Research("sm", this.game.researches);
  }
  setRelations(): void {
    //#region Leaf Cutter
    this.leafCutter.generateBuyAction([
      new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_1),
      new Price(this.game.materials.soil, CONSTS.PRICE_1)
    ]);
    this.game.addTwinAction(this.leafCutter, CONSTS.TWIN_PRICE_1);
    this.game.materials.food.addProducer(this.leafCutter, CONSTS.CONSUME_1);
    this.game.materials.soil.addProducer(this.leafCutter, CONSTS.CONSUME_1);
    this.game.units
      .filter(u => u.tags.includes(Tags.FARMER))
      .forEach(u => u.productionsEfficiency.push(this.leafCutter.helpBonus));
    this.leafCutter.setBugType(BugTypes.SUPER_MAJOR);
    //#endregion
    //#region Miner Helper
    this.minerHelper.generateBuyAction([
      new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_1),
      new Price(this.game.materials.soil, CONSTS.PRICE_1)
    ]);
    this.game.addTwinAction(this.minerHelper, CONSTS.TWIN_PRICE_1);
    this.game.materials.food.addProducer(this.minerHelper, CONSTS.CONSUME_1);
    this.game.materials.soil.addProducer(this.minerHelper, CONSTS.CONSUME_1);
    this.game.units
      .filter(u => u.tags.includes(Tags.MINER))
      .forEach(u => u.productionsEfficiency.push(this.minerHelper.helpBonus));
    this.minerHelper.setBugType(BugTypes.SUPER_MAJOR);
    //#endregion
    //#region Soil Helper
    this.soilHelper.generateBuyAction([
      new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_1),
      new Price(this.game.materials.soil, CONSTS.PRICE_1)
    ]);
    this.game.addTwinAction(this.soilHelper, CONSTS.TWIN_PRICE_1);
    this.game.materials.food.addProducer(this.soilHelper, CONSTS.CONSUME_1);
    this.game.materials.soil.addProducer(this.soilHelper, CONSTS.CONSUME_1);
    this.game.units
      .filter(u => u.tags.includes(Tags.SOIL_G))
      .forEach(u => u.productionsEfficiency.push(this.soilHelper.helpBonus));
    this.soilHelper.setBugType(BugTypes.SUPER_MAJOR);
    //#endregion

    this.game.buildings.firstResearch.toUnlock.push(this.majorHelperRes);
    this.majorHelperRes.prices = this.game.genSciencePrice(
      CONSTS.RES_PRICE_2.times(5)
    );
    this.majorHelperRes.bugType = BugTypes.SUPER_MAJOR;
    [this.leafCutter, this.minerHelper, this.soilHelper].forEach(u => {
      const res = new Research(u.id, this.game.researches);
      res.toUnlock.push(u);
      res.prices = this.game.genSciencePrice(CONSTS.RES_PRICE_2.times(10));
      this.majorHelperRes.toUnlock.push(res);
    });

    this.general.generateBuyAction([
      new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_2)
    ]);
    this.headquarter.generateBuyAction([
      new Price(this.game.materials.soil, CONSTS.PRICE_2)
    ]);
    this.game.killers.list.forEach(k =>
      k.productionsAll.push(this.general.helpBonus, this.headquarter.helpBonus)
    );
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
