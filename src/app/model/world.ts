import { ProductionBonus } from "./production-bonus";
import { Price } from "./price";
import { IUnlocable } from "./iunlocable";
import { FullUnit } from "./full-unit";

export class World {
  name = "";
  level = 0;

  //  Productions Bonus/Malus
  productionsBonus = new Array<ProductionBonus>();
  productionsEfficienty = new Array<ProductionBonus>();
  productionsAll = new Array<ProductionBonus>();

  // Unlocked stuff
  startingUnlocked = new Array<IUnlocable>();

  // Starting stuff
  //  Unit, Quantity
  startingUnit = new Array<[FullUnit, Decimal]>();

  //  Win
  winContidions = new Array<Price>();
}
