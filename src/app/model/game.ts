import { EventEmitter } from "@angular/core";
import { FullUnit } from "./full-unit";
import { UnitGroup } from "./unit-group";
import { Materials } from "./units/materials";
import { BaseUnit } from "./baseUnit";
import { Utility } from "./utility";
import { Gatherers } from "./units/gatherers";
import { Tabs } from "./tabs";
import { Researchs } from "./units/researchs";
import { Price } from "./price";
import { Workers } from "./units/workers";

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
  researchs: Researchs;
  //#endregion

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

    this.researchs = new Researchs(this.researchEmitter);

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

    this.unitGroups.forEach(g => g.declareStuff());
    this.researchs.declareStuff();

    //
    //  Relations
    //
    this.unitGroups.forEach(g => g.setRelations());
    this.researchs.setRelations(this.materials.science, this);
    this.researchs.team1.toUnlock.push(this.advWorkers.firstResearch);
    this.advWorkers.firstResearch.toUnlock.push(this.genX2.firstResearch);
    this.genX2.firstResearch.toUnlock.push(this.genX3.firstResearch);

    this.materials.food.quantity = new Decimal(1e100);

    //
    //  Debug
    //
    this.materials.list.forEach(u => (u.quantity = new Decimal(1e100)));
    // this.materials.list.forEach(u => (u.unlocked = true));
    // this.unitGroups.forEach(g => g.list.forEach(u => (u.unlocked = true)));

    //
    //  Build list
    //
    this.unitGroups.forEach(g => g.check(true));
    this.unitGroups
      .map(g => g.list)
      .forEach(l => l.forEach(u => this.units.push(u)));
    this.check();
  }
  check() {
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

      for (const prod1 of unit.producedBy.filter(p => p.productor.isActive())) {
        // x
        const prodX = prod1.prodPerSec;
        unit.c = unit.c.plus(prodX.times(prod1.productor.quantity));

        for (const prod2 of prod1.productor.producedBy.filter(p =>
          p.productor.isActive()
        )) {
          // x^2
          const prodX2 = prod2.prodPerSec.times(prodX);
          unit.b = unit.b.plus(prodX2.times(prod2.productor.quantity));

          for (const prod3 of prod2.productor.producedBy.filter(p =>
            p.productor.isActive()
          )) {
            // x^3
            const prodX3 = prod3.prodPerSec.times(prodX2);
            unit.a = unit.a.plus(prodX3.times(prod3.productor.quantity));
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

    if (unitZero)
      unitZero.producedBy
        .filter(p => p.rateo.lt(0))
        .forEach(p => (p.productor.efficiency = 0));

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
   *
   * @memberof Game
   */
  postUpdate() {
    this.unlockedUnits.forEach(u => {
      u.actions.forEach(a => a.reload());
      u.quantity = u.quantity.max(0);
    });
    this.researchs.researchs.filter(r => r.unlocked).forEach(u => u.reload());
  }

  /**
   * Calculate production per second
   */
  reloadProduction() {
    this.unlockedUnits.forEach(u => {
      u.reloadBonus(this.researchs.team1.done);
      u.produces.forEach(p => p.reloadProdPerSec(this.researchs.team1.done));
    });
  }

  genTeamPrice(price: Decimal): Price[] {
    return [new Price(this.materials.science, price, 4)];
  }
  genTwinPrice(price: Decimal): Price[] {
    return [new Price(this.materials.science, price, 10)];
  }
  genSciencePrice(price: Decimal): Price[] {
    return [new Price(this.materials.science, price, 1)];
  }
  //#region Save and Load
  getSave(): any {
    return {
      u: this.units.map(u => u.getSave()),
      t: this.tabs.getSave(),
      r: this.researchs.getSave()
    };
  }
  restore(data: any): boolean {
    if ("u" in data) {
      for (const s of data.u) this.units.find(u => u.id === s.i).restore(s);
      if ("t" in data) this.tabs.restore(data.t);
      if ("r" in data) this.researchs.restore(data.r);
      this.unitGroups.forEach(g => g.check());
      this.check();
      return true;
    } else {
      return false;
    }
  }
  //#endregion
}
