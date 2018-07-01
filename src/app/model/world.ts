import { Price } from "./price";
import { FullUnit } from "./full-unit";
import { BaseUnit } from "./baseUnit";
import { Game } from "./game";
import { Malus } from "./malus";
import { uniq, sample } from "lodash-es";
import { STRINGS } from "./strings";
import { Utility } from "./utility";
import { Research } from "./research";

export class World {
  static prefix = new Array<World>();
  static biome = new Array<World>();
  static suffix = new Array<World>();

  name = "";
  level = new Decimal(1);
  prestige = new Decimal(10);

  //  Productions Bonus/Malus
  productionsBonus = new Array<[BaseUnit, Decimal]>();
  productionsEfficienty = new Array<[BaseUnit, Decimal]>();
  productionsAll = new Array<[BaseUnit, Decimal]>();

  // Unlocked stuff
  startingUnlocked = new Array<Research>();

  // Starting stuff
  //  Unit, Quantity
  startingUnit = new Array<[FullUnit, Decimal]>();

  //  Wining condition
  winContidions = new Array<Price>();
  //  This resources must be zero
  notWinConditions = new Array<Malus>();

  constructor(public id = "") {
    if (id !== "") this.name = STRINGS.worlds[this.id];
  }

  setLevel(level: Decimal) {
    this.level = new Decimal(level);
    const multi = level.div(10).plus(1);
    const multiLog = new Decimal(multi.plus(1.1).log(1.1));
    this.productionsBonus.forEach(b => (b[1] = b[1].times(multi)));
    this.productionsEfficienty.forEach(b => (b[1] = b[1].times(multi)));
    this.productionsAll.forEach(b => (b[1] = b[1].times(multi)));
    this.startingUnit.forEach(b => (b[1] = b[1].times(multi)));
    this.winContidions.forEach(w => {
      w.price = w.price.times(w.base.winNonLiner ? multi : multiLog);
    });
    this.level = level
      .times(10)
      .times(level.plus(10).log10())
      .floor();
  }
  canTravel(): boolean {
    this.winContidions.forEach(p => {
      p.canBuy = p.base.quantity.gte(p.price);
    });
    return !(
      this.winContidions.findIndex(p => !p.canBuy) > -1 ||
      this.notWinConditions.findIndex(n => !n.isKilled) > -1
    );
  }

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

  // tslint:disable-next-line:member-ordering
  static merge(worlds: World[]): World {
    const retWorld = new World();

    retWorld.name = worlds.map(w => w.name).reduce((p, c) => p + " " + c);

    worlds.forEach(w => {
      w.productionsBonus.forEach(a => {
        const prod = retWorld.productionsBonus.find(p => p[0] === a[0]);
        if (!prod) retWorld.productionsBonus.push([a[0], new Decimal(a[1])]);
        else prod[1] = prod[1].plus(a[1]);
      });
      w.productionsEfficienty.forEach(a => {
        const prod = retWorld.productionsEfficienty.find(p => p[0] === a[0]);
        if (!prod)
          retWorld.productionsEfficienty.push([a[0], new Decimal(a[1])]);
        else prod[1] = prod[1].plus(a[1]);
      });
      w.productionsAll.forEach(a => {
        const prod = retWorld.productionsAll.find(p => p[0] === a[0]);
        if (!prod) retWorld.productionsAll.push([a[0], new Decimal(a[1])]);
        else prod[1] = prod[1].plus(a[1]);
      });
      //  Starting
      w.startingUnit.forEach(a => {
        const un = retWorld.startingUnit.find(p => p[0] === a[0]);
        if (!un) retWorld.startingUnit.push([a[0], new Decimal(a[1])]);
        else un[1] = un[1].plus(a[1]);
      });
      //  Win
      w.winContidions.forEach(a => {
        const win = retWorld.winContidions.find(p => p.base === a.base);
        if (!win) retWorld.winContidions.push(new Price(a.base, a.price, 1));
        else win.price = win.price.plus(a.price);
      });
    });

    //  Unlocked
    retWorld.startingUnlocked = uniq(
      [].concat.apply([], worlds.map(w => w.startingUnlocked))
    );
    //  Malus
    retWorld.notWinConditions = uniq(
      [].concat.apply([], worlds.map(w => w.notWinConditions))
    );

    return retWorld;
  }
  // tslint:disable-next-line:member-ordering
  static getRandomWorld(min: Decimal, max: Decimal): World {
    const world = World.merge([
      sample(World.prefix),
      sample(World.biome),
      sample(World.suffix)
    ]);

    world.setLevel(Utility.random(min, max));

    return world;
  }
}
