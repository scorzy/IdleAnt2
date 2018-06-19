import { BaseUnit } from "../baseUnit";
import { Game } from "../game";
import { ProductionBonus } from "../production-bonus";

export class WorldBonus {
  static bonusValue = new Decimal(0.3);

  foodBonus: BaseUnit;
  woodBonus: BaseUnit;
  crystalBonus: BaseUnit;
  scienceBonus: BaseUnit;

  bonusList: BaseUnit[];

  declareStuff(): void {
    this.foodBonus = new BaseUnit("foB");
    this.woodBonus = new BaseUnit("woB");
    this.crystalBonus = new BaseUnit("crB");
    this.scienceBonus = new BaseUnit("scB");

    this.bonusList = [
      this.foodBonus,
      this.woodBonus,
      this.crystalBonus,
      this.scienceBonus
    ];
  }
  setRelations(game: Game): void {
    game.materials.food.productionsBonus.push(
      new ProductionBonus(this.foodBonus, WorldBonus.bonusValue)
    );
    game.materials.wood.productionsBonus.push(
      new ProductionBonus(this.woodBonus, WorldBonus.bonusValue)
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
}
