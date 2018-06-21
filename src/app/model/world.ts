import { Price } from "./price";
import { IUnlocable } from "./iunlocable";
import { FullUnit } from "./full-unit";
import { BaseUnit } from "./baseUnit";
import { Game } from "./game";
import { Malus } from "./malus";

export class World {
  name = "";
  level = new Decimal(1);

  //  Productions Bonus/Malus
  productionsBonus = new Array<[BaseUnit, Decimal]>();
  productionsEfficienty = new Array<[BaseUnit, Decimal]>();
  productionsAll = new Array<[BaseUnit, Decimal]>();

  // Unlocked stuff
  startingUnlocked = new Array<IUnlocable>();

  // Starting stuff
  //  Unit, Quantity
  startingUnit = new Array<[FullUnit, Decimal]>();

  //  Wining condition
  winContidions = new Array<Price>();
  //  This resources must be zero
  notWinConditions = new Array<Malus>();

  //#region Save and Load
  getSave(): any {
    return {
      n: this.name,
      l: this.level,
      pb: this.productionsBonus.map(b => [b[0].id, b[1]]),
      pe: this.productionsEfficienty.map(b => [b[0].id, b[1]]),
      pa: this.productionsAll.map(b => [b[0].id, b[1]])
    };
  }
  restore(data: any, game: Game) {
    if ("n" in data) this.name = data.n;
    if ("l" in data) this.level = new Decimal(data.l);
    if ("pb" in data) {
      this.productionsBonus = data.pb.map(b => [
        this.findBonus(b[0], game),
        new Decimal(b[1])
      ]);
    }
    if ("pe" in data) {
      this.productionsEfficienty = data.pe.map(b => [
        this.findBonus(b[0], game),
        new Decimal(b[1])
      ]);
    }
    if ("pa" in data) {
      this.productionsAll = data.pa.map(b => [
        this.findBonus(b[0], game),
        new Decimal(b[1])
      ]);
    }
  }
  findBonus(id: string, game: Game): BaseUnit {
    return game.worldBonus.bonusList.find(b => b.id === id);
  }
  //#endregion
}
