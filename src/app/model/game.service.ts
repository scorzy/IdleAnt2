import { Injectable } from "@angular/core";
import { FullUnit } from "./full-unit";
import { Production } from "./production";
import { UnitGroup } from "./unit-group";
import { Materials } from "./units/materials";
import { BaseUnit } from "./baseUnit";

@Injectable({
  providedIn: "root"
})
export class GameService {
  units = new Array<BaseUnit>();
  unlockedUnits = new Array<BaseUnit>();

  prod = new Array<Production>();

  unitGroups = new Array<UnitGroup>();
  //#region UnitGroups
  materials: Materials;
  //#endregion

  constructor() {
    this.materials = new Materials();
    this.unitGroups.push(this.materials);

    this.unitGroups.forEach(g => g.declareStuff());
    this.unitGroups.forEach(g => g.setRelations());
    this.unitGroups.forEach(g => g.check(true));
    this.unitGroups
      .map(g => g.list)
      .forEach(l => (this.units = this.units.concat(l)));
    this.check();
  }
  check() {
    this.unlockedUnits = this.units.filter(u => u.unlocked);
  }

  //#region Save and Load
  getSave(): any {
    return {
      u: this.units.map(u => u.getSave())
    };
  }
  restore(data: any): boolean {
    if ("u" in data) {
      for (const s of data.u) this.units.find(u => u.id === s.i).restore(s);
      return true;
    } else {
      return false;
    }
  }
  //#endregion
}
