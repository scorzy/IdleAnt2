import { EventEmitter } from "@angular/core";
import { FullUnit } from "./full-unit";
import { UnitGroup } from "./unit-group";
import { Materials } from "./units/materials";
import { BaseUnit } from "./baseUnit";
import { Utility } from "./utility";
import { Gatherers } from "./units/gatherers";
import { Tabs } from "./tabs";
import { Researches } from "./units/researches";
import { Price } from "./price";
import { Workers } from "./units/workers";
import { World } from "./world";
import { WorldBonus } from "./units/world-bonus";
import { Malus } from "./malus";
import { WorldMalus } from "./units/world-malus";

export class Game {
  units = new Array<BaseUnit>();
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

  researches: Researches;
  worldBonus: WorldBonus;
  worldMalus: WorldMalus;
  //#endregion

  lastUnitUrl: string = "nav/unit/fo";

  currentWorld: World = new World();

  constructor(
    public updateEmitter: EventEmitter<number>,
    public researchEmitter: EventEmitter<string>
  ) {
    this.tabs = new Tabs();

    //
    //  Declarations
    //
    this.materials = new Materials(this);
    this.unitGroups.push(this.materials);

    this.researches = new Researches(this.researchEmitter);

    this.gatherers = new Gatherers(this);
    this.unitGroups.push(this.gatherers);

    this.advWorkers = new Workers(this);
    this.unitGroups.push(this.advWorkers);

    this.genX2 = this.advWorkers.getProducerGroup(
      "Buildings",
      new Decimal(1e6)
    );
    this.unitGroups.push(this.genX2);

    this.genX3 = this.genX2.getProducerGroup("Engineers", new Decimal(1e10));
    this.unitGroups.push(this.genX3);

    this.worldMalus = new WorldMalus(this);
    this.unitGroups.push(this.worldMalus);

    this.unitGroups.forEach(g => g.declareStuff());
    this.researches.declareStuff();
    this.worldBonus = new WorldBonus();
    this.worldBonus.declareStuff();

    //
    //  Relations
    //
    this.unitGroups.forEach(g => g.setRelations());
    this.researches.setRelations(this.materials.science, this);
    this.researches.team1.toUnlock.push(this.advWorkers.firstResearch);
    this.advWorkers.firstResearch.toUnlock.push(this.genX2.firstResearch);
    this.genX2.firstResearch.toUnlock.push(this.genX3.firstResearch);
    this.worldBonus.setRelations(this);

    this.worldMalus.foodMalus1.malusType = this.materials.food;
    this.worldMalus.woodMalus1.malusType = this.materials.wood;
    this.worldMalus.crystalMalus1.malusType = this.materials.crystal;
    this.worldMalus.scienceMalus1.malusType = this.materials.science;

    this.materials.food.malus = this.worldMalus.foodMalus1;
    this.materials.wood.malus = this.worldMalus.woodMalus1;
    this.materials.crystal.malus = this.worldMalus.crystalMalus1;
    this.materials.science.malus = this.worldMalus.scienceMalus1;

    //
    //  Debug
    //
    this.materials.food.quantity = new Decimal(1e100);
    // this.materials.list.forEach(u => (u.quantity = new Decimal(1e100)));
    // this.materials.list.forEach(u => (u.unlocked = true));
    // this.unitGroups.forEach(g => g.list.forEach(u => (u.unlocked = true)));
    // this.worldMalus.foodMalus1.quantity = new Decimal(100);

    //
    //  Build list
    //
    this.unitGroups.forEach(g => g.check(true));
    this.unitGroups
      .map(g => g.list)
      .forEach(l => l.forEach(u => this.units.push(u)));
    this.buildLists();
    this.unitGroups.forEach(g => (g.selected = g.list.filter(u => u.unlocked)));
  }
  buildLists() {
    this.unlockedUnits = [];
    this.units.forEach(u => {
      if (u instanceof FullUnit && u.unlocked) this.unlockedUnits.push(u);
    });
    this.unlockedGroups = this.unitGroups.filter(g => g.unlocked.length > 0);
  }

  /**
   * Update function.
   * Works only with resource groving at max rate of x^3
   * When something reach zero consumers are stopped and it will update again
   * @param time in milliseconds
   */
  update(time: number) {
    let maxTime = time;
    let unitZero: FullUnit = null;

    this.unlockedUnits.forEach(u => {
      u.isEnding = false;
    });

    this.reloadProduction();

    for (const unit of this.unlockedUnits) {
      unit.a = new Decimal(0);
      unit.b = new Decimal(0);
      unit.c = new Decimal(0);
      const d = unit.quantity;

      for (const prod1 of unit.producedBy.filter(p => p.producer.isActive())) {
        // x
        const prodX = prod1.prodPerSec;
        unit.c = unit.c.plus(prodX.times(prod1.producer.quantity));

        for (const prod2 of prod1.producer.producedBy.filter(p =>
          p.producer.isActive()
        )) {
          // x^2
          const prodX2 = prod2.prodPerSec.times(prodX);
          unit.b = unit.b.plus(prodX2.times(prod2.producer.quantity));

          for (const prod3 of prod2.producer.producedBy.filter(p =>
            p.producer.isActive()
          )) {
            // x^3
            const prodX3 = prod3.prodPerSec.times(prodX2);
            unit.a = unit.a.plus(prodX3.times(prod3.producer.quantity));
          }
        }
      }
      unit.a = unit.a.div(6);
      unit.b = unit.b.div(2);

      if (unit.a.lt(0) || unit.b.lt(0) || unit.c.lt(0) || d.lt(0)) {
        const solution = Utility.solveEquation(
          unit.a,
          unit.b,
          unit.c,
          d
        ).filter(s => s.gt(0));

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

    if (maxTime > Number.EPSILON && !this.isPaused)
      this.update2(new Decimal(maxTime).div(1000));

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

    const remaning = time - maxTime;
    if (remaning > Number.EPSILON) {
      this.reloadProduction();
      this.update(remaning);
    }
  }

  /**
   * Sub Update function.
   * @param seconds time in seconds
   */
  update2(seconds: Decimal) {
    this.unlockedUnits.forEach(u => {
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
      u.actions.forEach(a => a.reload());
      u.quantity = u.quantity.max(0);
      u.setUiValue();
    });
    this.researches.researches.filter(r => r.unlocked).forEach(u => u.reload());
    const team = this.researches.team2.done;
    const twin = this.researches.twin.done;
    this.unitGroups.forEach(g => g.setFlags(team, twin));
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
  //#region Price Utility
  genTeamPrice(price: Decimal): Price[] {
    return [new Price(this.materials.science, price, 4)];
  }
  genTwinPrice(price: Decimal): Price[] {
    return [new Price(this.materials.science, price, 10)];
  }
  genSciencePrice(price: Decimal): Price[] {
    return [new Price(this.materials.science, price, 1)];
  }
  //#endregion
  //#region Save and Load
  getSave(): any {
    return {
      u: this.units.map(u => u.getSave()),
      t: this.tabs.getSave(),
      r: this.researches.getSave(),
      w: this.currentWorld.getSave()
    };
  }
  restore(data: any): boolean {
    if ("u" in data) {
      for (const s of data.u) this.units.find(u => u.id === s.i).restore(s);
      if ("t" in data) this.tabs.restore(data.t);
      if ("r" in data) this.researches.restore(data.r);
      if ("w" in data) this.currentWorld.restore(data.w, this);

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
