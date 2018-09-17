import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";
import { UnitGroup } from "../unit-group";
import { World } from "../world";

export class Special extends UnitGroup {
  foodSupply: FullUnit;
  soilSupply: FullUnit;
  crystallSupply: FullUnit;

  constructor(game: Game) {
    super("Special", game);
  }
  declareStuff(): void {
    this.foodSupply = new FullUnit("fS");
    this.soilSupply = new FullUnit("wS");
    this.crystallSupply = new FullUnit("cS");

    this.addUnits([this.foodSupply, this.soilSupply, this.crystallSupply]);
  }
  setRelations(): void {
    this.foodSupply.generateBuyAction([
      new Price(this.game.materials.food, new Decimal(1e3), 1.5)
    ]);
    this.soilSupply.generateBuyAction([
      new Price(this.game.materials.soil, new Decimal(1e3), 1.5)
    ]);
    this.crystallSupply.generateBuyAction([
      new Price(this.game.materials.crystal, new Decimal(1e3), 1.5)
    ]);

    this.game.materials.food.addProducer(this.foodSupply, new Decimal(30));
    this.game.materials.soil.addProducer(this.soilSupply, new Decimal(30));
    this.game.materials.crystal.addProducer(
      this.crystallSupply,
      new Decimal(30)
    );
  }
  addWorlds() {
    [this.foodSupply, this.soilSupply, this.crystallSupply].forEach(supp => {
      const pre = new World(supp.id + "Pre");
      const suff = new World(supp.id + "Suff");
      [pre, suff].forEach(w => w.startingUnit.push([supp, new Decimal(1)]));
      World.prefix.push(pre);
      World.suffix.push(suff);
    });
  }
}
