import { Injectable } from "@angular/core";
declare let numberformat;

@Injectable({
  providedIn: "root"
})
export class OptionsService {
  usaFormat = false;
  numFormat = "scientific";
  autosaveNotification = true;

  formatter: any;
  constructor() {
    this.generateFormatter();
  }
  generateFormatter() {
    this.formatter = new numberformat.Formatter({
      format: this.numFormat,
      sigfigs: 2,
      flavor: "short"
    });
  }

  //#regin Save and Load
  getSave(): any {
    return {
      u: this.usaFormat,
      n: this.numFormat,
      s: this.autosaveNotification
    };
  }
  restore(data: any) {
    if ("u" in data) this.usaFormat = data.u;
    if ("n" in data) this.numFormat = data.n;
    if ("s" in data) this.autosaveNotification = data.s;
    this.generateFormatter();
  }
  //#endregion
}
