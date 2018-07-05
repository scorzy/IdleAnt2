import { Injectable, EventEmitter } from "@angular/core";
declare let numberformat;

@Injectable({
  providedIn: "root"
})
export class OptionsService {
  usaFormat = false;
  numFormat = "scientific";
  autosaveNotification = true;
  dark = false;
  header = 6;

  formatter: any;
  formatEmitter: EventEmitter<number> = new EventEmitter<number>();
  headerEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    this.generateFormatter();
  }
  generateFormatter() {
    this.formatter = new numberformat.Formatter({
      format: this.numFormat,
      sigfigs: 2,
      flavor: "short"
    });
    if (!!this.formatEmitter) this.formatEmitter.emit(1);
  }

  //#regin Save and Load
  getSave(): any {
    return {
      u: this.usaFormat,
      n: this.numFormat,
      s: this.autosaveNotification,
      d: this.dark,
      h: this.header
    };
  }
  restore(data: any) {
    if ("u" in data) this.usaFormat = data.u;
    if ("n" in data) this.numFormat = data.n;
    if ("s" in data) this.autosaveNotification = data.s;
    if ("d" in data) this.dark = data.d;
    if ("h" in data) this.header = data.h;
    this.generateFormatter();
  }
  //#endregion
}
