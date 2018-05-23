import { Injectable } from "@angular/core";
import { FullUnit } from "./full-unit";
import { Production } from "./production";

@Injectable({
  providedIn: "root"
})
export class GameService {
  units = new Array<FullUnit>();
  prod = new Array<Production>();

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
