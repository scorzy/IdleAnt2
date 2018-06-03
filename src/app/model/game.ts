import { Injectable, EventEmitter } from "@angular/core";
import { FullUnit } from "./full-unit";
import { Production } from "./production";
import { UnitGroup } from "./unit-group";
import { Materials } from "./units/materials";
import { BaseUnit } from "./baseUnit";
import { Utility } from "./utility";
import { Workers } from "./units/workers";
import { Tab } from "./tab";
import { Tabs } from "./tabs";
import { Researchs } from "./units/researchs";
import { Price } from "./price";
import { Worker2 } from "./units/worker2";

export class Game {
  units = new Array<BaseUnit>();
  unlockedUnits = new Array<FullUnit>();

  unitGroups = new Array<UnitGroup>();
  unlockedGroups = new Array<UnitGroup>();

  isPaused = false;
  tabs: Tabs;

  //#region UnitGroups
  materials: Materials;
  workers: Workers;
  advWorkers: Worker2;

  researchs: Researchs;
  //#endregion

  constructor(
    public updateEmitter: EventEmitter<number>,
    public researchEmitter: EventEmitter<string>
  ) {
    this.tabs = new Tabs();

    this.materials = new Materials(this);
    this.unitGroups.push(this.materials);

    this.workers = new Workers(this);
    this.unitGroups.push(this.workers);

    this.advWorkers = new Worker2(this);

    this.unitGroups.forEach(g => g.declareStuff());
    this.researchs = new Researchs(
      this.materials.science,
      this.researchEmitter
    );
    this.researchs.declareStuff();

    this.unitGroups.forEach(g => g.setRelations());
    this.researchs.setRelations();

    // this.materials.list.forEach(u => (u.quantity = new Decimal(1e100)));
    this.materials.list.forEach(u => (u.unlocked = true));

    this.unitGroups.forEach(g => g.check(true));
    this.unitGroups
      .map(g => g.list)
      .forEach(l => l.forEach(u => this.units.push(u)));
    this.check();
    this.materials.food.quantity = new Decimal(1e4);
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
      u.reloadBonus(this.researchs.team1.done);
      u.produces.forEach(p => p.reloadProdPerSec(this.researchs.team1.done));
      u.isEnding = false;
    });

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
      // this.reloadProduction();
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

  genTeamPrice(price: Decimal): Price[] {
    return [new Price(this.materials.science, price, 4)];
  }
  genTwinPrice(price: Decimal): Price[] {
    return [new Price(this.materials.science, price, 10)];
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
