import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { MasteryTypes } from "../masteries/mastery";
import { Price } from "../price";
import { ProductionBonus } from "../production-bonus";
import { Research } from "../research";
import { UnitGroup } from "../unit-group";
import { World } from "../world";

export const PRICE = new Decimal(100);
export const PROD = new Decimal(20);
export const CONSUME = new Decimal(-15);

export class Workers extends UnitGroup {
  farmer: FullUnit;
  carpenter: FullUnit;
  miner: FullUnit;
  scientist: FullUnit;

  scientificMethod1: Research;

  constructor(game: Game) {
    super("Ants", game);
  }

  declareStuff(): void {
    this.farmer = new FullUnit("f");
    this.carpenter = new FullUnit("c");
    this.miner = new FullUnit("m");
    this.scientist = new FullUnit("s");

    this.scientificMethod1 = new Research("scie1", this.game.researches, true);

    this.addUnits([this.farmer, this.carpenter, this.miner, this.scientist]);

    this.firstResearch = new Research("work_res", this.game.researches);
    this.list.forEach(u => {
      const res = new Research(u.id + "_wr", this.game.researches);
      res.toUnlock = [u];
      this.researchList.push(res);
    });
  }
  setRelations(): void {
    this.farmer.generateBuyAction([
      new Price(this.game.materials.food, PRICE, 1.1),
      new Price(this.game.materials.crystal, PRICE, 1.1)
    ]);
    this.carpenter.generateBuyAction([
      new Price(this.game.materials.food, PRICE.times(2), 1.1)
    ]);
    this.miner.generateBuyAction([
      new Price(this.game.materials.food, PRICE, 1.1),
      new Price(this.game.materials.wood, PRICE, 1.1)
    ]);
    this.scientist.generateBuyAction([
      new Price(this.game.materials.food, PRICE, 1.1),
      new Price(this.game.materials.crystal, PRICE, 1.1)
    ]);

    this.game.materials.food.addProducer(this.farmer, PROD);
    this.game.materials.crystal.addProducer(this.farmer, CONSUME);

    this.game.materials.wood.addProducer(this.carpenter, PROD);
    this.game.materials.food.addProducer(this.carpenter, CONSUME);

    this.game.materials.crystal.addProducer(this.miner, PROD);
    this.game.materials.wood.addProducer(this.miner, CONSUME);

    this.game.materials.science.addProducer(this.scientist, PROD);
    this.game.materials.crystal.addProducer(this.scientist, CONSUME);

    this.generateStandardActions();

    this.firstResearch.prices = this.game.genSciencePrice(new Decimal(1e3));
    this.researchList.forEach(
      r => (r.prices = this.game.genSciencePrice(new Decimal(5e3)))
    );
    this.firstResearch.toUnlock = this.researchList;

    this.scientificMethod1.prices = this.game.genSciencePrice(1e4, 100);
    this.researchList[3].toUnlock.push(this.scientificMethod1);

    const scieMetBon = new ProductionBonus(
      this.scientificMethod1,
      new Decimal(0.5)
    );
    scieMetBon.getMultiplier = () => {
      return new Decimal(
        1 + this.game.allMateries.getSum(MasteryTypes.SCIENTIFIC_METHOD)
      );
    };
    this.game.materials.science.productionsBonus.push(scieMetBon);
  }
}
