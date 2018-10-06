import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";
import { UnitGroup } from "../unit-group";
import { World } from "../world";

export class Special extends UnitGroup {
  foodSupply: FullUnit;
  soilSupply: FullUnit;
  crystalSupply: FullUnit;

  constructor(game: Game) {
    super("Special", game);
  }
  declareStuff(): void {
    this.foodSupply = new FullUnit("fS");
    this.soilSupply = new FullUnit("wS");
    this.crystalSupply = new FullUnit("cS");

    this.addUnits([this.foodSupply, this.soilSupply, this.crystalSupply]);
  }
  setRelations(): void {
    this.foodSupply.generateBuyAction([
      new Price(this.game.materials.food, new Decimal(1e3), 1.5)
    ]);
    this.soilSupply.generateBuyAction([
      new Price(this.game.materials.soil, new Decimal(1e3), 1.5)
    ]);
    this.crystalSupply.generateBuyAction([
      new Price(this.game.materials.crystal, new Decimal(1e3), 1.5)
    ]);

    this.game.materials.food.addProducer(this.foodSupply, new Decimal(30));
    this.game.materials.soil.addProducer(this.soilSupply, new Decimal(30));
    this.game.materials.crystal.addProducer(
      this.crystalSupply,
      new Decimal(30)
    );
  }
  addWorlds() {
    [this.foodSupply, this.soilSupply, this.crystalSupply].forEach(supp => {
      const pre = new World(supp.id + "Pre");
      const suff = new World(supp.id + "Suff");
      [pre, suff].forEach(w => w.startingUnit.push([supp, new Decimal(1)]));
      World.prefix.push(pre);
      World.suffix.push(suff);
    });
  }
}
