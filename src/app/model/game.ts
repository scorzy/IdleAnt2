import { EventEmitter } from "@angular/core";
import { WarpAction } from "./actions/warp-action";
import { AutoBuyManager } from "./autoBuy/auto-buy-manager";
import { FullUnit } from "./full-unit";
import { Malus } from "./malus";
import { AllPrestige } from "./prestige/all-prestige";
import { Price } from "./price";
import { Stats } from "./stats/stats";
import { Tabs } from "./tabs";
import { UnitGroup } from "./unit-group";
import { Gatherers } from "./units/gatherers";
import { MalusKiller } from "./units/malus-killer";
import { Materials } from "./units/materials";
import { Researches } from "./units/researches";
import { Workers } from "./units/workers";
import { WorldBonus } from "./units/world-bonus";
import { WorldMalus } from "./units/world-malus";
import { Utility } from "./utility";
import { World } from "./world";

const STARTING_FOOD = new Decimal(100);

export class Game {
  units = new Array<FullUnit>();
  unlockedUnits = new Array<FullUnit>();

  unitGroups = new Array<UnitGroup>();
  unlockedGroups = new Array<UnitGroup>();

  isPaused = false;
  tabs: Tabs;

  //#region UnitGroups
  materials: Materials;
  gatherers: Gatherers;
  advWorkers: Workers;
  genX2: UnitGroup;
  genX3: UnitGroup;
  killers: UnitGroup;

  researches: Researches;
  worldBonus: WorldBonus;
  worldMalus: WorldMalus;
  //#endregion

  lastUnitUrl: string = "nav/unit/fo";

  currentWorld = new World();
  nextWorlds = new Array<World>();
  canTravel = false;

  maxLevel = new Decimal(1e3);
  experience: FullUnit;
  time: FullUnit;
  allPrestige: AllPrestige;

  canBuyResearch = false;

  actMin: WarpAction;
  actHour: WarpAction;

  autoBuyManager: AutoBuyManager;
  stats: Stats;

  constructor(
    public updateEmitter: EventEmitter<number>,
    public researchEmitter: EventEmitter<string>
  ) {
    this.tabs = new Tabs();

    //#region Declarations
    this.materials = new Materials(this);
    this.unitGroups.push(this.materials);

    this.researches = new Researches(this.researchEmitter);

    this.gatherers = new Gatherers(this);
    this.unitGroups.push(this.gatherers);

    this.advWorkers = new Workers(this);
    this.unitGroups.push(this.advWorkers);

    this.genX2 = this.advWorkers.getProducerGroup(
      "Buildings",
      new Decimal(1e6),
      "Bu"
    );
    this.unitGroups.push(this.genX2);

    this.genX3 = this.genX2.getProducerGroup(
      "Engineers",
      new Decimal(1e10),
      "En"
    );
    this.unitGroups.push(this.genX3);

    this.worldMalus = new WorldMalus(this);
    this.unitGroups.push(this.worldMalus);

    this.killers = new MalusKiller(this);
    this.unitGroups.push(this.killers);

    this.unitGroups.forEach(g => g.declareStuff());

    this.researches.declareStuff();
    this.worldBonus = new WorldBonus();
    this.worldBonus.declareStuff();

    this.experience = new FullUnit("prest");
    this.time = new FullUnit("time");
    //#endregion
    //#region Relations
    this.unitGroups.forEach(g => g.setRelations());
    this.researches.setRelations(this.materials.science, this);
    this.researches.team1.toUnlock.push(this.advWorkers.firstResearch);
    this.advWorkers.firstResearch.toUnlock.push(this.genX2.firstResearch);
    this.genX2.firstResearch.toUnlock.push(this.genX3.firstResearch);
    this.worldBonus.setRelations(this);
    //#endregion
    //#region Worlds
    this.worldBonus.addWorlds();
    this.unitGroups.forEach(g => g.addWorlds());
    //#endregion
    //#region Prestige
    this.allPrestige = new AllPrestige();
    this.allPrestige.declareStuff(this);
    //#endregion
    //#region Starting stuff
    this.materials.food.quantity = new Decimal(STARTING_FOOD);
    //#endregion
    //#region Debug
    this.materials.food.quantity = new Decimal(1e100);
    // this.materials.list.forEach(u => (u.quantity = new Decimal(1e100)));
    // this.materials.list.forEach(u => (u.unlocked = true));
    this.unitGroups.forEach(g => g.list.forEach(u => (u.unlocked = true)));
    this.tabs.tabList.forEach(t => (t.unlocked = true));
    // // this.worldMalus.foodMalus1.quantity = new Decimal(100);
    // this.worldMalus.foodMalus1.quantity = new Decimal(100);
    // this.worldMalus.foodMalus2.quantity = new Decimal(10);
    // this.experience.quantity = new Decimal(1000);
    //#endregion
    //#region Build Lists
    this.unitGroups.forEach(g => g.check(true));
    this.unitGroups
      .map(g => g.list)
      .forEach(l => l.forEach(u => this.units.push(u)));
    this.units.push(this.experience, this.time);
    this.buildLists();
    this.unitGroups.forEach(g => (g.selected = g.list.filter(u => u.unlocked)));
    //#endregion
    //#region Worlds
    // World.biome.push(new World());
    // this.currentWorld.winContidions.push(
    //   new Price(this.genX3.list[0], new Decimal(100))
    // );
    // this.currentWorld.notWinConditions.push(this.worldMalus.crystalMalus1);
    this.generateWorlds();
    //#endregion
    //#region Time Warp
    this.actMin = new WarpAction(60, this);
    this.actHour = new WarpAction(3600, this);
    //#endregion
    //#region Assign team and twin research to actions
    this.units.forEach(u => {
      if (u.teamAction) u.teamAction.requiredResearch = this.researches.team2;
      if (u.twinAction) u.twinAction.requiredResearch = this.researches.twin;
    });
    //#endregion
    //#region Autobuyers
    this.autoBuyManager = new AutoBuyManager();
    this.units.filter(u => u.hasAutoBuyer).forEach(u => {
      if (!!u.buyAction) {
        this.autoBuyManager.createFromUnit(u, this);
      } else {
        u.hasAutoBuyer = false;
      }
    });
    //#endregion
    this.stats = new Stats();
  }
  buildLists() {
    this.unlockedUnits = [];
    this.units.forEach(u => {
      if (u instanceof FullUnit && u.unlocked) this.unlockedUnits.push(u);
    });
    this.unlockedGroups = this.unitGroups.filter(g => g.unlocked.length > 0);
  }
  /**
   * Update game and add time
   * @param delta time passed in milliseconds
   */
  updateWithTime(delta: number) {
    const timePerSec = this.allPrestige.time.timeProducer.quantity.div(10);
    this.time.quantity = this.time.quantity
      .plus(timePerSec.times(delta / 1000))
      .min(this.allPrestige.time.timeBank.quantity.times(3600).plus(7200));
    this.time.c = timePerSec;
    this.update(delta);
  }
  /**
   * Update function.
   * Works only with resource groving at max rate of x^3
   * When something reach zero consumers are stopped and it will update again
   * @param delta in milliseconds
   */
  update(delta: number) {
    let maxTime = delta;
    let unitZero: FullUnit = null;

    this.unlockedUnits.forEach(u => {
      u.isEnding = false;
      u.endIn = Number.POSITIVE_INFINITY;
    });

    this.reloadProduction();

    //#region get polynom
    for (const unit of this.unlockedUnits) {
      unit.tempA = new Decimal(0);
      unit.tempB = new Decimal(0);
      unit.tempC = new Decimal(0);
      const d = unit.quantity;

      for (const prod1 of unit.producedBy.filter(p => p.producer.isActive())) {
        // x
        const prodX = prod1.prodPerSec;
        unit.tempC = unit.tempC.plus(prodX.times(prod1.producer.quantity));

        for (const prod2 of prod1.producer.producedBy.filter(p =>
          p.producer.isActive()
        )) {
          // x^2
          const prodX2 = prod2.prodPerSec.times(prodX);
          unit.tempB = unit.tempB.plus(prodX2.times(prod2.producer.quantity));

          for (const prod3 of prod2.producer.producedBy.filter(p =>
            p.producer.isActive()
          )) {
            // x^3
            const prodX3 = prod3.prodPerSec.times(prodX2);
            unit.tempA = unit.tempA.plus(prodX3.times(prod3.producer.quantity));
          }
        }
      }
      unit.tempA = unit.tempA.div(6);
      unit.tempB = unit.tempB.div(2);
      if (!unit.tempA.eq(unit.a)) unit.a = unit.tempA;
      if (!unit.tempB.eq(unit.b)) unit.b = unit.tempB;
      if (!unit.tempC.eq(unit.c)) unit.c = unit.tempC;
      //#endregion

      if (unit.a.lt(0) || unit.b.lt(0) || unit.c.lt(0) || d.lt(0)) {
        const solution = Utility.solveEquation(
          unit.a,
          unit.b,
          unit.c,
          d
        ).filter(s => s.gte(0));

        if (solution.length > 0) {
          const min = solution.reduce(
            (p, c) => p.min(c),
            new Decimal(Number.POSITIVE_INFINITY)
          );
          if (maxTime > min.toNumber() * 1000) {
            maxTime = min.toNumber() * 1000;
            unitZero = unit;
          }
          unit.endIn = Math.min(min.times(1000).toNumber(), unit.endIn);
          unit.isEnding = true;
        }
      }
    }

    this.unlockedUnits
      .filter(u => u.endIn > 0)
      .forEach(u => (u.endIn = u.endIn - maxTime));

    if (!this.isPaused) {
      if (maxTime > Number.EPSILON) {
        this.update2(new Decimal(maxTime).div(1000));
      }

      // Something has ened
      if (unitZero) {
        //  Stop consumers
        unitZero.producedBy
          .filter(p => p.rateo.lt(0))
          .forEach(p => (p.producer.efficiency = 0));

        //  Kill Malus
        if (unitZero instanceof Malus) {
          unitZero.kill();
        }
      }

      const remaning = delta - maxTime;
      if (remaning > Number.EPSILON) {
        this.reloadProduction();
        this.update(remaning);
      }
    }
  }
  /**
   * Sub Update function.
   * @param seconds time in seconds
   */
  update2(seconds: Decimal) {
    this.unlockedUnits
      .filter(u => !u.a.eq(0) || !u.b.eq(0) || !u.c.eq(0))
      .forEach(u => {
        u.quantity = u.quantity
          .plus(u.a.times(Decimal.pow(seconds, 3)))
          .plus(u.b.times(Decimal.pow(seconds, 2)))
          .plus(u.c.times(seconds));
      });
  }
  /**
   *  Reload actions costs
   *  and eventually fix quantity > 0
   */
  postUpdate() {
    this.worldMalus.foodMalus1.reloadPriceMulti();
    this.worldMalus.woodMalus1.reloadPriceMulti();
    this.worldMalus.crystalMalus1.reloadPriceMulti();
    this.worldMalus.scienceMalus1.reloadPriceMulti();

    this.unlockedUnits.forEach(u => {
      // u.actions.forEach(a => a.reload());
      u.quantity = u.quantity.max(0);
    });

    this.autoBuyManager.update();

    this.researches.toDo.forEach(u => u.reload());
    this.canBuyResearch = !!this.researches.researches.find(
      r => r.unlocked && r.canBuy
    );
    this.unlockedUnits.forEach(u => {
      u.actions.forEach(a => a.reload());
      // u.setUiValue();
    });
    const team = this.researches.team2.done;
    const twin = this.researches.twin.done;
    this.unitGroups.forEach(g => g.setFlags(team, twin));
    this.canTravel = this.currentWorld.canTravel();
  }
  /**
   * Calculate production per second
   */
  reloadProduction() {
    this.unlockedUnits.forEach(u => {
      u.reloadTeamBonus(this.researches.team1.done);
      u.produces.forEach(p => p.reloadProdPerSec(this.researches.team1.done));
    });
  }
  /**
   * Apply world bonus
   */
  applyWorldBonus() {
    this.worldBonus.reset();
    this.currentWorld.productionsBonus.forEach(b => {
      b[0].quantity = new Decimal(b[1]);
      b[0].unlocked = true;
    });
    this.currentWorld.productionsAll.forEach(b => {
      b[0].quantity = new Decimal(b[1]);
      b[0].unlocked = true;
    });
    this.currentWorld.productionsEfficienty.forEach(b => {
      b[0].quantity = new Decimal(b[1]);
      b[0].unlocked = true;
    });
  }
  /**
   * Prestige, reset everything except prestige stuff
   * and move to another world
   * @param world choosen world
   */
  goToWorld(world: World): boolean {
    this.stats.logWorldCompleted(this.currentWorld, !this.canTravel);

    const newPrestige = this.experience.quantity.plus(
      this.currentWorld.prestige
    );

    this.units.forEach(u => u.reset());
    this.materials.food.quantity = new Decimal(STARTING_FOOD);
    this.gatherers.drone.unlocked = true;
    this.materials.food.unlocked = true;

    if (this.canTravel) {
      this.experience.quantity = newPrestige;
      this.maxLevel = this.maxLevel.plus(this.currentWorld.level);
    }

    this.currentWorld = world;
    this.applyWorldBonus();
    this.researches.reset();

    //#region  Followers
    this.units.filter(u => u.follower).forEach(u => {
      u.quantity = u.quantity.plus(
        u.follower.quantity.times(u.followerQuantity)
      );
      if (u.quantity.gt(0.5)) {
        u.unlock();
        if (u.buyAction && u.buyAction.toUnlock) {
          u.buyAction.toUnlock.forEach(a => a.unlock());
        }
      }
    });
    //#endregion

    this.unitGroups.forEach(g => g.check());
    this.buildLists();
    this.generateWorlds();

    this.tabs.prestige.unlock();

    return true;
  }
  generateWorlds(userMin: Decimal = null, userMax: Decimal = null) {
    if (userMin == null) userMin = new Decimal(1);
    if (userMax == null) userMax = this.maxLevel;

    userMax = Decimal.min(userMax, this.maxLevel);

    this.nextWorlds = [
      World.getRandomWorld(userMin, userMax),
      World.getRandomWorld(userMin, userMax),
      World.getRandomWorld(userMin, userMax)
    ];
  }
  //#region Price Utility
  genTeamPrice(price: Decimal | number): Price[] {
    return [new Price(this.materials.science, new Decimal(price), 4)];
  }
  genTwinPrice(price: Decimal | number): Price[] {
    return [new Price(this.materials.science, new Decimal(price), 10)];
  }
  genSciencePrice(price: Decimal | number): Price[] {
    return [new Price(this.materials.science, new Decimal(price), 1)];
  }
  genExperiencePrice(price: Decimal | number): Price[] {
    return [new Price(this.experience, new Decimal(price), 1)];
  }
  //#endregion
  //#region Save and Load
  getSave(): any {
    return {
      u: this.units.map(u => u.getSave()),
      t: this.tabs.getSave(),
      r: this.researches.getSave(),
      w: this.currentWorld.getSave(),
      p: this.allPrestige.getSave(),
      m: this.maxLevel,
      a: this.isPaused,
      abm: this.autoBuyManager.getSave(),
      s: this.stats.getSave()
    };
  }
  restore(data: any): boolean {
    if ("u" in data) {
      for (const s of data.u) this.units.find(u => u.id === s.i).restore(s);
      if ("t" in data) this.tabs.restore(data.t);
      if ("r" in data) this.researches.restore(data.r);
      if ("w" in data) this.currentWorld.restore(data.w, this);
      if ("p" in data) this.allPrestige.restore(data.p);
      if ("m" in data) this.maxLevel = new Decimal(data.m);
      if ("a" in data) this.isPaused = data.a;
      if ("abm" in data) this.autoBuyManager.restore(data.abm);
      if ("s" in data) this.stats.restore(data.s);

      this.unitGroups.forEach(g => g.check());
      this.buildLists();
      this.unitGroups.forEach(
        g => (g.selected = g.list.filter(u => u.unlocked))
      );

      this.applyWorldBonus();
      this.reloadProduction();
      return true;
    } else {
      return false;
    }
  }
  //#endregion
}
