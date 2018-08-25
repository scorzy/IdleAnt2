import { Game } from "../game";
import { Price } from "../price";
import { UnitGroup } from "../unit-group";
import { World } from "../world";
import { FullUnit } from "./../full-unit";

export class Special extends UnitGroup {
  foodSupply: FullUnit;
  woodSupply: FullUnit;
  crystallSupply: FullUnit;

  constructor(game: Game) {
    super("Special", game);
  }
  declareStuff(): void {
    this.foodSupply = new FullUnit("fS");
    this.woodSupply = new FullUnit("wS");
    this.crystallSupply = new FullUnit("cS");

    this.addUnits([this.foodSupply, this.woodSupply, this.crystallSupply]);
  }
  setRelations(): void {
    this.foodSupply.generateBuyAction([
      new Price(this.game.materials.food, new Decimal(1e3), 2)
    ]);
    this.woodSupply.generateBuyAction([
      new Price(this.game.materials.wood, new Decimal(1e3), 2)
    ]);
    this.crystallSupply.generateBuyAction([
      new Price(this.game.materials.crystal, new Decimal(1e3), 2)
    ]);

    this.game.materials.food.addProducer(this.foodSupply, new Decimal(100));
    this.game.materials.wood.addProducer(this.woodSupply, new Decimal(100));
    this.game.materials.crystal.addProducer(
      this.crystallSupply,
      new Decimal(100)
    );
  }
  addWorlds() {
    [this.foodSupply, this.woodSupply, this.crystallSupply].forEach(supp => {
      const pre = new World(supp.id + "Pre");
      const suff = new World(supp.id + "Suff");
      [pre, suff].forEach(w => w.startingUnit.push([supp, new Decimal(1)]));
      World.prefix.push(pre);
      World.suffix.push(suff);
    });
  }
}
