import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";
import { Research } from "../research";
import { UnitGroup } from "../unit-group";
import { Bug, World } from "../world";
import { CONSUME, PRICE, PROD } from "./workers";

export class Bee extends UnitGroup {
  worker: FullUnit;

  constructor(game: Game) {
    super("Bee", game);
  }

  declareStuff(): void {
    this.worker = new FullUnit("workBee");
    this.addUnits([this.worker]);

    this.firstResearch = new Research("bee_res", this.game.researches);
    this.list.forEach(u => {
      const res = new Research(u.id + "_wr", this.game.researches);
      res.toUnlock = [u];
      this.researchList.push(res);
    });
  }
  setRelations(): void {
    this.worker.generateBuyAction([
      new Price(this.game.materials.food, PRICE, 1.1),
      new Price(this.game.materials.crystal, PRICE, 1.1)
    ]);
    this.game.materials.food.addProducer(this.worker, PROD);
    this.game.materials.crystal.addProducer(this.worker, CONSUME);

    this.generateStandardActions();

    this.firstResearch.prices = this.game.genSciencePrice(new Decimal(1e3));
    this.researchList.forEach(
      r => (r.prices = this.game.genSciencePrice(new Decimal(5e3)))
    );
    this.firstResearch.toUnlock = this.researchList;
  }
  addWorlds() {
    const beePre = new World("beePre");
    const beeBio = new World("beeBio");
    const beeSuff = new World("beeSuff");
    [beePre, beeBio, beeSuff].forEach(w => w.additionalBugs.push(Bug.BEE));
    World.suffix.push(beeSuff);
    World.biome.push(beeBio);
    World.prefix.push(beePre);
  }
}
