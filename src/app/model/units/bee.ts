import { FullUnit } from "../full-unit";
import { ADDITIONAL_PRICE1, ADDITIONAL_PRICE2, Game } from "../game";
import { Price } from "../price";
import { Research } from "../research";
import { UnitGroup } from "../unit-group";
import { World } from "../world";
import { BugTypes } from "./../bugsTypes";
import { CONSUME, PRICE, PROD } from "./workers";

export class Bee extends UnitGroup {
  worker: FullUnit;
  scientist: FullUnit;

  private beeX2: UnitGroup;
  private beeX3: UnitGroup;

  constructor(game: Game) {
    super("Bee", game);
  }

  declareStuff(): void {
    this.worker = new FullUnit("workBee");
    this.scientist = new FullUnit("scieBee");

    this.addUnits([this.worker, this.scientist]);

    this.firstResearch = new Research("bee_res", this.game.researches);
    this.list.forEach(u => {
      const res = new Research(u.id + "_wr", this.game.researches);
      res.toUnlock = [u];
      this.researchList.push(res);
    });
    this.additionalBuyPreces = [
      new Price(this.game.materials.food, ADDITIONAL_PRICE1)
    ];
    this.beeX2 = this.getProducerGroup("Bees 2", new Decimal(1e6), "Be2");
    this.beeX3 = this.beeX2.getProducerGroup(
      "Bees 3",
      new Decimal(1e10),
      "Be3"
    );
    this.beeX2.additionalBuyPreces = [
      new Price(this.game.materials.food, ADDITIONAL_PRICE2)
    ];
    this.beeX2.declareStuff();
    this.beeX3.declareStuff();
  }
  setRelations(): void {
    this.worker.generateBuyAction([
      new Price(this.game.materials.food, PRICE, 1.1),
      new Price(this.game.materials.crystal, PRICE, 1.1)
    ]);
    this.scientist.generateBuyAction([
      new Price(this.game.materials.food, PRICE, 1.1),
      new Price(this.game.materials.crystal, PRICE, 1.1)
    ]);

    this.game.materials.food.addProducer(this.worker, PROD);
    this.game.materials.crystal.addProducer(this.worker, CONSUME);
    this.game.materials.science.addProducer(this.worker, PROD);
    this.game.materials.crystal.addProducer(this.worker, CONSUME);

    this.generateStandardActions();

    this.firstResearch.prices = this.game.genSciencePrice(new Decimal(1e3));
    this.researchList.forEach(
      r => (r.prices = this.game.genSciencePrice(new Decimal(5e3)))
    );
    this.firstResearch.toUnlock = this.researchList;
    this.beeX2.setRelations();
    this.beeX3.setRelations();
    this.firstResearch.toUnlock.push(this.beeX2.firstResearch);
    this.beeX2.firstResearch.toUnlock.push(this.beeX3.firstResearch);
    this.addUnits(this.beeX3.list.concat(this.beeX2.list).concat(this.list));

    this.setBugType(BugTypes.BEE);
  }
  addWorlds() {
    const beePre = new World("beePre");
    const beeBio = new World("beeBio");
    const beeSuff = new World("beeSuff");
    [beePre, beeBio, beeSuff].forEach(w => w.additionalBugs.push(BugTypes.BEE));
    World.suffix.push(beeSuff);
    World.biome.push(beeBio);
    World.prefix.push(beePre);
  }
}
