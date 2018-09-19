import { random } from "lodash-es";
import sample from "lodash-es/sample";
import uniq from "lodash-es/uniq";
import { BaseUnit } from "./baseUnit";
import { BugTypes } from "./bugsTypes";
import { CONSTS } from "./CONSTATS";
import { FullUnit } from "./full-unit";
import { Game } from "./game";
import { Malus } from "./malus";
import { MasteryTypes } from "./masteries/mastery";
import { Price } from "./price";
import { Research } from "./research";
import { STRINGS } from "./strings";
import { Utility } from "./utility";

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

  //  Additional bug
  additionalBugs = new Array<BugTypes>();

  constructor(public id = "") {
    if (id !== "") this.name = STRINGS.worlds[this.id];
  }

  setLevel(level: Decimal, game: Game) {
    this.winContidions.push(
      new Price(game.ants.nest, CONSTS.BASE_WIN_CONDITION_OTHER)
    );
    this.additionalBugs.push(BugTypes.ANT);

    this.level = new Decimal(level).floor();

    const multi = this.level.div(5).plus(1);
    this.productionsBonus.forEach(b => (b[1] = b[1].times(multi)));
    this.productionsEfficienty.forEach(b => (b[1] = b[1].times(multi)));
    this.productionsAll.forEach(b => (b[1] = b[1].times(multi)));
    this.startingUnit.forEach(b => (b[1] = b[1].times(multi)));

    const masteryReduction =
      game.allMateries.getSum(MasteryTypes.WORLD_LEVEL) * 0.015;

    this.winContidions.forEach(w => {
      w.price = w.price.times(multi);

      w.price = w.base.winNonLiner
        ? w.price.pow(0.7 - masteryReduction)
        : w.price.times(Decimal.pow(4, multi)).pow(0.95);

      w.price = w.price.floor();
    });

    this.prestige = this.level
      .times(10)
      .times(this.level.plus(10).log10())
      .floor();

    if (this.level.gte(5) && this.notWinConditions.length < 1) {
      const malus = [
        game.worldMalus.foodMalus1,
        game.worldMalus.soilMalus1,
        game.worldMalus.crystalMalus1,
        game.worldMalus.scienceMalus1
      ];
      this.notWinConditions.push(sample(malus));
    }

    //  Apply Prestige bonus
    let multiBonus = game.allPrestige.worldPrestige.betterWorlds.quantity.times(
      0.1
    );
    multiBonus = multiBonus.times(
      1 + game.allMateries.getSum(MasteryTypes.BETTER_WORLD) * 0.2
    );
    multiBonus = multiBonus.plus(1);

    if (multiBonus.gt(1)) {
      [
        this.productionsBonus,
        this.productionsEfficienty,
        this.productionsAll
      ].forEach(prod => {
        prod.forEach(p => {
          p[1] = p[1].times(multiBonus);
        });
      });
    }
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
  setMalus() {
    this.notWinConditions.forEach(n => {
      n.quantity = new Decimal(this.level.times(5));
      n.producedBy.find(u => u.rateo.lt(0)).producer.unlock();
      const n2 = n.producedBy.find(u => u.rateo.gt(0)).producer;
      const n3 = n2.producedBy.find(u => u.rateo.gt(0)).producer;

      n2.quantity = n.quantity.div(3.5);

      if (n2.quantity.gt(0.1)) {
        n2.unlock();
        // tslint:disable-next-line:prettier
        n3.quantity = n.quantity.div(1.5).pow(0.9);
        if (n3.quantity.gt(0.1)) {
          n3.unlock();
        } else {
          n3.quantity = new Decimal(0);
        }
      } else {
        n2.quantity = new Decimal(0);
      }
    });
  }
  setGame() {
    this.setMalus();
    this.startingUnit.forEach(s => {
      s[0].unlock();
      s[0].quantity = s[1];
    });
  }

  //#region Save and Load
  getSave(): any {
    return {
      n: this.name,
      l: this.level,
      pb: this.productionsBonus.map(b => [b[0].id, b[1]]),
      pe: this.productionsEfficienty.map(b => [b[0].id, b[1]]),
      pa: this.productionsAll.map(b => [b[0].id, b[1]]),
      wc: this.winContidions.map(w => [w.base.id, w.price]),
      nwc: this.notWinConditions.map(n => n.id),
      adb: this.additionalBugs,
      k: this.prestige
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
    if ("wc" in data) {
      this.winContidions = data.wc.map(
        w =>
          new Price(game.units.find(u => u.id === w[0]), new Decimal(w[1]), 1)
      );
    }
    if ("nwc" in data) {
      this.notWinConditions = data.nwc.map(nwc =>
        game.units.find(u => u.id === nwc)
      );
    }
    if ("adb" in data) {
      this.additionalBugs = data.adb;
    }
    this.prestige =
      "k" in data
        ? new Decimal(data.k)
        : this.level
            .times(10)
            .times(this.level.plus(10).log10())
            .floor();
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
        const prod = retWorld.productionsBonus.find(p => p[0].id === a[0].id);
        if (!prod) retWorld.productionsBonus.push([a[0], new Decimal(a[1])]);
        else prod[1] = prod[1].plus(a[1]);
      });
      w.productionsEfficienty.forEach(a => {
        const prod = retWorld.productionsEfficienty.find(
          p => p[0].id === a[0].id
        );
        if (!prod) {
          retWorld.productionsEfficienty.push([a[0], new Decimal(a[1])]);
        } else prod[1] = prod[1].plus(a[1]);
      });
      w.productionsAll.forEach(a => {
        const prod = retWorld.productionsAll.find(p => p[0].id === a[0].id);
        if (!prod) retWorld.productionsAll.push([a[0], new Decimal(a[1])]);
        else prod[1] = prod[1].plus(a[1]);
      });
      //  Starting
      w.startingUnit.forEach(a => {
        const un = retWorld.startingUnit.find(p => p[0].id === a[0].id);
        if (!un) retWorld.startingUnit.push([a[0], new Decimal(a[1])]);
        else un[1] = un[1].plus(a[1]);
      });
      //  Win
      w.winContidions.forEach(a => {
        const win = retWorld.winContidions.find(p => p.base.id === a.base.id);
        if (!win) retWorld.winContidions.push(new Price(a.base, a.price, 1));
        else win.price = win.price.plus(a.price.div(3));
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
    //  Bugs
    retWorld.additionalBugs = uniq(
      [].concat.apply([], worlds.map(w => w.additionalBugs))
    );

    return retWorld;
  }
  // tslint:disable-next-line:member-ordering
  static getRandomWorld(min: Decimal, max: Decimal, game: Game): World {
    const toMerge: World[] = [];
    if (
      game.allMateries.getSum(MasteryTypes.DOUBLE_PREFIX) > 0 &&
      Math.random() > 0.3
    ) {
      toMerge.push(sample(World.prefix));
    }
    toMerge.push(
      sample(World.prefix),
      sample(World.biome),
      sample(World.suffix)
    );
    if (
      game.allMateries.getSum(MasteryTypes.DOUBLE_SUFFIX) > 0 &&
      Math.random() > 0.3
    ) {
      toMerge.push(sample(World.suffix));
    }
    const world = World.merge(toMerge);
    world.setLevel(Utility.random(min, max), game);

    return world;
  }
}
