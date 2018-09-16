import { BaseUnit } from "../baseUnit";
import { Game } from "../game";
import { ProductionBonus } from "../production-bonus";
import { World } from "../world";

export class WorldBonus {
  static bonusValue = new Decimal(0.3);

  foodBonus: BaseUnit;
  soilBonus: BaseUnit;
  crystalBonus: BaseUnit;
  scienceBonus: BaseUnit;
  killBonus: BaseUnit;

  bonusList: BaseUnit[];

  declareStuff(): void {
    this.foodBonus = new BaseUnit("1");
    this.soilBonus = new BaseUnit("2");
    this.crystalBonus = new BaseUnit("3");
    this.scienceBonus = new BaseUnit("4");
    this.killBonus = new BaseUnit("5");

    this.bonusList = [
      this.foodBonus,
      this.soilBonus,
      this.crystalBonus,
      this.scienceBonus,
      this.killBonus
    ];
  }
  setRelations(game: Game): void {
    game.materials.food.productionsBonus.push(
      new ProductionBonus(this.foodBonus, WorldBonus.bonusValue)
    );
    game.materials.soil.productionsBonus.push(
      new ProductionBonus(this.soilBonus, WorldBonus.bonusValue)
    );
    game.materials.crystal.productionsBonus.push(
      new ProductionBonus(this.crystalBonus, WorldBonus.bonusValue)
    );
    game.materials.science.productionsBonus.push(
      new ProductionBonus(this.scienceBonus, WorldBonus.bonusValue)
    );
  }
  reset() {
    this.bonusList.forEach(b => {
      b.unlocked = false;
      b.quantity = new Decimal(0);
    });
  }
  addWorlds(): void {
    [
      this.foodBonus,
      this.soilBonus,
      this.crystalBonus,
      this.scienceBonus
    ].forEach(b => {
      const pre = new World(b.id + "Pre");
      pre.productionsBonus = [[b, new Decimal(1)]];
      World.prefix.push(pre);

      const suff = new World(b.id + "Suf");
      suff.productionsBonus = [[b, new Decimal(1)]];
      World.suffix.push(suff);
    });
  }
}
