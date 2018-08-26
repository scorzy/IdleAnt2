import { EventEmitter, ReflectiveInjector } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { EndInPipe } from "./../end-in.pipe";
import { FormatPipe } from "./../format.pipe";
import { WarpAction } from "./actions/warp-action";
import { AutoBuyManager } from "./autoBuy/auto-buy-manager";
import { Bug, BugTypes } from "./bugsTypes";
import { CONSTS } from "./CONSTATS";
import { FullUnit } from "./full-unit";
import { Malus } from "./malus";
import { AllMasteries } from "./masteries/all-masteries";
import { Mastery, MasteryTypes } from "./masteries/mastery";
import { AllPrestige } from "./prestige/all-prestige";
import { Price } from "./price";
import { ProductionBonus } from "./production-bonus";
import { Stats } from "./stats/stats";
import { Tabs } from "./tabs";
import { UnitGroup } from "./unit-group";
import { Ants } from "./units/ants";
import { Bees } from "./units/bees";
import { Buildings } from "./units/buildings";
import { Engineers } from "./units/engineers";
import { Gatherers } from "./units/gatherers";
import { MalusKiller } from "./units/malus-killer";
import { Materials } from "./units/materials";
import { Researches } from "./units/researches";
import { Special } from "./units/special";
import { Workers } from "./units/workers";
import { WorldBonus } from "./units/world-bonus";
import { WorldMalus } from "./units/world-malus";
import { Utility } from "./utility";
import { World } from "./world";

const STARTING_FOOD = new Decimal(100);
export const ADDITIONAL_PRICE1 = new Decimal(1e4);
export const ADDITIONAL_PRICE2 = new Decimal(1e9);

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
  buildings: Buildings;
  engineers: Engineers;
  killers: UnitGroup;
  ants: Ants;
  bees: Bees;

  researches: Researches;
  worldBonus: WorldBonus;
  worldMalus: WorldMalus;
  special: Special;
  //#endregion

  lastUnitUrl: string = "nav/unit/f";

  currentWorld = new World();
  nextWorlds = new Array<World>();
  canTravel = false;

  maxLevel = new Decimal(5);
  experience: FullUnit;
  time: FullUnit;
  allPrestige: AllPrestige;

  canBuyResearch = false;

  actMin: WarpAction;
  actHour: WarpAction;

  autoBuyManager: AutoBuyManager;
  stats: Stats;
  allMateries: AllMasteries;
  maxTimeBank = new Decimal(0);

  constructor(
    public updateEmitter: EventEmitter<number>,
    public researchEmitter: EventEmitter<string>,
    public unlockGroupEmiter: EventEmitter<number>,
    private toastr: ToastrService,
    public formatPipe: FormatPipe,
    public endInPipe: EndInPipe
  ) {
    this.tabs = new Tabs();

    //#region Declarations
    this.materials = new Materials(this);
    this.unitGroups.push(this.materials);

    this.researches = new Researches(this.researchEmitter, this);

    this.ants = new Ants(this);
    this.unitGroups.push(this.ants);

    this.bees = new Bees(this);
    this.unitGroups.push(this.bees);

    this.gatherers = new Gatherers(this);
    this.unitGroups.push(this.gatherers);

    this.advWorkers = new Workers(this);
    this.unitGroups.push(this.advWorkers);

    this.buildings = new Buildings(this);
    this.unitGroups.push(this.buildings);

    this.engineers = new Engineers(this);
    this.unitGroups.push(this.engineers);

    this.worldMalus = new WorldMalus(this);
    this.unitGroups.push(this.worldMalus);

    this.killers = new MalusKiller(this);
    this.unitGroups.push(this.killers);

    this.special = new Special(this);
    this.unitGroups.push(this.special);

    this.unitGroups.forEach(g => g.declareStuff());

    this.advWorkers.additionalBuyPreces = [
      new Price(this.materials.soil, ADDITIONAL_PRICE1)
    ];

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
    this.currentWorld = new World("home");
    this.currentWorld.name = "Home World";
    this.currentWorld.level = new Decimal(1);
    this.currentWorld.winContidions.push(
      new Price(this.materials.food, CONSTS.BASE_WIN_CONDITION_MATERIALS)
    );
    this.currentWorld.setLevel(new Decimal(1), this);
    this.setStartingStuff();
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
    this.autoBuyManager.createSpecial(this);
    //#endregion

    this.allMateries = new AllMasteries(this);
    this.stats = new Stats();

    //#region Special Stuff
    this.researches.mastery.onBuy = () => {
      this.allMateries.totalEarned++;
      this.allMateries.masteryPoint++;
    };
    this.materials.science.productionsBonus.push(
      new ProductionBonus(this.experience, new Decimal(1))
    );
    this.setMaxTimeBank();
    this.units.forEach(u => {
      if (u.teamAction) u.teamAction.teamRes = this.researches.team2;
      if (u.twinAction) u.twinAction.twinRes = this.researches.twin;
    });
    //#endregion

    //#region Debug

    // this.materials.list.forEach(u => (u.quantity = new Decimal(1e100)));
    // this.ants.nest.quantity = new Decimal(100);
    // this.materials.list.forEach(u => (u.unlocked = true));
    // this.unitGroups.forEach(g => g.list.forEach(u => u.unlock()));
    this.tabs.tabList.forEach(t => (t.unlocked = true));
    // this.worldMalus.foodMalus1.quantity = new Decimal(100);
    // this.worldMalus.foodMalus1.quantity = new Decimal(100);
    // this.worldMalus.foodMalus2.quantity = new Decimal(10);
    this.experience.quantity = new Decimal(1000);
    // this.allMateries.masteryPoint = 30;
    // this.experience.quantity = new Decimal(1e10);
    // this.units.forEach(u => {
    //   u.isNew = false;
    // });
    // this.researches.team1.unlocked = true;
    // this.researches.team1.done = true;
    // this.researches.team1.complete = true;
    // this.researches.team1.quantity = new Decimal(1);
    // this.researches.team1.toUnlock.forEach(u => u.unlock());
    // this.researches.team2.unlocked = true;
    // this.researches.team2.done = true;
    // this.researches.team2.quantity = new Decimal(1);
    // this.researches.team2.complete = true;
    // this.researches.team2.toUnlock.forEach(u => u.unlock());
    // this.researches.twin.unlocked = true;
    // this.researches.twin.done = true;
    // this.researches.twin.quantity = new Decimal(1);
    // this.researches.twin.complete = true;
    // this.researches.twin.toUnlock.forEach(u => u.unlock());
    this.time.quantity = new Decimal(100);

    //#endregion
  }
  buildLists() {
    this.unlockedUnits = [];
    this.units.forEach(u => {
      if (u instanceof FullUnit && u.unlocked) this.unlockedUnits.push(u);
    });
    const oldNum = this.unlockedGroups.length;
    this.unlockedGroups = this.unitGroups.filter(g => g.unlocked.length > 0);
    if (oldNum !== this.unlockedGroups.length) {
      this.unlockGroupEmiter.emit(this.unlockedGroups.length);
    }
  }
  setMaxTimeBank() {
    this.maxTimeBank = this.allPrestige.time.timeBank.quantity
      .times(3600)
      .plus(7200)
      .times(
        1 +
          0.5 * this.allMateries.getSum(MasteryTypes.TIME_BANK) +
          2 * this.allMateries.getSum(MasteryTypes.TIME_GEN_AND_BANK)
      );
  }
  /**
   * Update game and add time
   * @param delta time passed in milliseconds
   */
  updateWithTime(delta: number) {
    const timePerSec = this.allPrestige.time.timeProducer.quantity
      .div(10)
      .times(
        1 +
          0.3 * this.allMateries.getSum(MasteryTypes.TIME_GEN) +
          2 * this.allMateries.getSum(MasteryTypes.TIME_GEN_AND_BANK)
      );

    this.time.quantity = this.time.quantity
      .plus(timePerSec.times(delta / 1000))
      .min(this.maxTimeBank);

    this.time.c = timePerSec;
    this.update(delta);
  }
  /**
   * Update function.
   * Works only with resource groving at max rate of x^3
   * When something reach zero consumers are stopped and it will update again
   * @param delta in milliseconds
   * @param force force update, used for warp in pause
   */
  update(delta: number, force = false) {
    let maxTime = delta;
    let unitZero: FullUnit = null;

    this.unlockedUnits.forEach(u => {
      u.isEnding = false;
      u.endIn = Number.POSITIVE_INFINITY;
    });

    this.reloadProduction();

    for (const unit of this.unlockedUnits) {
      //#region get polynom
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

    if (!this.isPaused || force) {
      if (maxTime > 10) {
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
          if (unitZero.kill()) {
            this.toastr.success("", unitZero.name + " killed!");
          }
        } else {
          this.toastr.warning(unitZero.name + " ended!");
        }
      }

      const remaning = delta - maxTime;
      if (remaning > 10) {
        // this.reloadProduction();
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
    this.unlockedUnits.forEach(u => {
      // u.actions.forEach(a => a.reload());
      u.quantity = u.quantity.max(0);
    });
  }
  /**
   *  Reload actions costs
   *  and eventually fix quantity > 0
   */
  postUpdate(time) {
    this.worldMalus.foodMalus1.reloadPriceMulti();
    this.worldMalus.woodMalus1.reloadPriceMulti();
    this.worldMalus.crystalMalus1.reloadPriceMulti();
    this.worldMalus.scienceMalus1.reloadPriceMulti();

    this.unlockedUnits.forEach(u => {
      u.quantity = u.quantity.max(0);
    });
    if (!this.isPaused) this.autoBuyManager.update(time);

    this.researches.toDo.forEach(u => u.reload());
    this.canBuyResearch = !!this.researches.researches.find(
      r => r.unlocked && r.canBuy
    );
    this.unlockedUnits.forEach(u => {
      u.actions.forEach(a => a.reload());
    });
    const team = this.researches.team2.done;
    const twin = this.researches.twin.done;
    this.unitGroups.forEach(g => g.setFlags(team, twin));
    this.canTravel = this.currentWorld.canTravel();

    this.actHour.reload();
    this.actMin.reload();
  }
  /**
   * Time Warp
   * @param delta in milliseconds
   */
  warp(delta: number) {
    if (delta > 0) {
      this.toastr.info(this.endInPipe.transform(delta), "Time Warp");
      this.update(delta, true);
      this.autoBuyManager.update(delta);
    }
  }
  /**
   * Calculate production per second
   */
  reloadProduction() {
    const teamPrestigeBonus = this.allPrestige.team.betterTeam.quantity
      .times(0.3)
      .times(1 + this.allMateries.getSum(MasteryTypes.TEAM_PRESTIGE))
      .plus(1);

    this.unlockedUnits.forEach(u => {
      u.reloadTeamBonus(this.researches.team1.done, teamPrestigeBonus);
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
  setStartingStuff() {
    this.materials.food.unlocked = true;
    this.materials.food.quantity = STARTING_FOOD;
    this.ants.queen.unlocked = true;
    this.ants.queen.quantity = new Decimal(1);
    this.ants.larva.unlocked = true;
    this.ants.larva.quantity = new Decimal(10);
    this.gatherers.drone.unlocked = true;
    this.gatherers.drone.quantity = new Decimal(1);
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
    this.ants.queen.quantity = new Decimal(1);
    this.ants.larva.unlocked = true;
    this.gatherers.drone.unlocked = true;
    this.materials.food.unlocked = true;

    //  Update Experience
    if (this.canTravel) {
      this.experience.quantity = newPrestige;
      this.maxLevel = this.maxLevel
        .plus(this.currentWorld.level.div(3))
        .floor()
        .plus(1);
    }

    this.currentWorld = world;
    this.setStartingStuff();
    this.applyWorldBonus();
    this.researches.reset(this.materials.science);

    //#region Followers
    const flollowerMulti =
      this.allMateries.getSum(MasteryTypes.MORE_FOLLOWERS) + 1;
    const flollowerMultiGa =
      this.allMateries.getSum(MasteryTypes.MORE_FOLLOWERS_GA) * 3;
    const flollowerMultiWo =
      this.allMateries.getSum(MasteryTypes.MORE_FOLLOWERS_WO) * 3;

    this.units.filter(u => u.follower).forEach(u => {
      u.quantity = u.quantity.plus(
        u.follower.quantity.times(u.followerQuantity).times(flollowerMulti)
      );
      if (u.quantity.gt(0.5)) {
        u.unlock();
        if (u.buyAction && u.buyAction.toUnlock) {
          u.buyAction.toUnlock.forEach(a => a.unlock());
        }
      }
    });
    this.gatherers.list.filter(u => u.follower).forEach(u => {
      u.quantity = u.quantity.plus(
        u.follower.quantity.times(u.followerQuantity).times(flollowerMultiGa)
      );
    });
    this.advWorkers.list.filter(u => u.follower).forEach(u => {
      u.quantity = u.quantity.plus(
        u.follower.quantity.times(u.followerQuantity).times(flollowerMultiWo)
      );
    });
    //#endregion

    //#region Starting Team && TWin
    const startTeam = this.allMateries.getSum(MasteryTypes.TEAM_START);
    if (startTeam > 0) {
      this.units
        .filter(u => u.teamAction)
        .map(u => u.teamAction)
        .forEach(t => (t.quantity = t.quantity.plus(startTeam)));
      this.researches.team1.unlocked = true;
      this.researches.team1.done = true;
      this.researches.team1.complete = true;
      this.researches.team1.quantity = new Decimal(1);
      this.researches.team1.toUnlock.forEach(u => u.unlock());
      this.researches.team2.unlocked = true;
      this.researches.team2.done = true;
      this.researches.team2.quantity = new Decimal(1);
      this.researches.team2.complete = true;
      this.researches.team2.toUnlock.forEach(u => u.unlock());
      this.materials.science.unlock();
    }
    const startTwin = this.allMateries.getSum(MasteryTypes.START_TWIN);
    if (startTwin > 0) {
      this.units
        .filter(u => u.twinAction)
        .map(u => u.twinAction)
        .forEach(t => (t.quantity = t.quantity.plus(startTwin)));
      this.researches.twin.unlocked = true;
      this.researches.twin.done = true;
      this.researches.twin.quantity = new Decimal(1);
      this.researches.twin.complete = true;
      this.researches.twin.toUnlock.forEach(u => u.unlock());
      this.materials.science.unlock();
    }
    //#endregion

    //#region Free Warp
    this.researches.free1hWarp.unlocked =
      this.allMateries.getSum(MasteryTypes.FREE_WARP_RES) > 0;
    //#endregion

    //#region other Bugs
    if (this.currentWorld.additionalBugs.includes(BugTypes.BEE)) {
      //ToDo
    }
    //#endregion

    this.currentWorld.setGame();

    this.researches.reloadLists();
    this.unitGroups.forEach(g => g.check());
    this.buildLists();
    this.generateWorlds();

    this.tabs.prestige.unlock();

    this.materials.list.forEach(u => (u.quantity = new Decimal(1e100)));
    return true;
  }

  //#region Unit Utils
  generateWorlds(userMin: Decimal = null, userMax: Decimal = null) {
    if (userMin == null) userMin = new Decimal(1);
    if (userMax == null) userMax = this.maxLevel;

    userMax = Decimal.min(userMax, this.maxLevel);

    this.nextWorlds = [
      World.getRandomWorld(userMin, userMax, this),
      World.getRandomWorld(userMin, userMax, this),
      World.getRandomWorld(userMin, userMax, this)
    ];
  }
  genSciencePrice(price: Decimal | number, growRate = 1): Price[] {
    return [new Price(this.materials.science, new Decimal(price), growRate)];
  }
  genExperiencePrice(price: Decimal | number, growRate = 1.3): Price[] {
    return [new Price(this.experience, new Decimal(price), growRate)];
  }
  addTeamAction(unit: FullUnit, price: Decimal | number) {
    unit.generateTeamAction(this.genTeamPrice(price));
  }
  addTwinAction(unit: FullUnit, price: Decimal | number) {
    unit.generateTwinAction(this.genTwinPrice(price));
  }
  //#endregion
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
      s: this.stats.getSave(),
      mas: this.allMateries.getSave(),
      wor: this.nextWorlds.map(w => w.getSave())
    };
  }
  restore(data: any): boolean {
    if ("u" in data) {
      for (const s of data.u) this.units.find(u => u.id === s.i).restore(s);
      if ("t" in data) this.tabs.restore(data.t);
      if ("r" in data) this.researches.restore(data.r, this.materials.science);
      if ("w" in data) this.currentWorld.restore(data.w, this);
      if ("p" in data) this.allPrestige.restore(data.p);
      if ("m" in data) this.maxLevel = new Decimal(data.m);
      if ("a" in data) this.isPaused = data.a;
      if ("abm" in data) this.autoBuyManager.restore(data.abm);
      if ("s" in data) this.stats.restore(data.s);
      if ("mas" in data) this.allMateries.restore(data.mas);
      if ("wor" in data) {
        this.nextWorlds = data.wor.map(w => {
          const newW = new World("");
          newW.restore(w, this);
          return newW;
        });
      }

      this.unitGroups.forEach(g => g.check());
      this.buildLists();
      this.unitGroups.forEach(
        g => (g.selected = g.list.filter(u => u.unlocked))
      );

      this.applyWorldBonus();
      this.reloadProduction();
      this.setMaxTimeBank();
      return true;
    } else {
      return false;
    }
  }
  //#region Price Utility
  private genTeamPrice(price: Decimal | number): Price[] {
    return [new Price(this.materials.science, new Decimal(price), 4)];
  }
  private genTwinPrice(price: Decimal | number): Price[] {
    return [new Price(this.materials.science, new Decimal(price), 10)];
  }
  //#endregion
}
