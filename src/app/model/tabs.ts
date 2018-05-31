import { Tab } from "./tab";

export class Tabs {
  lab: Tab;

  tabList: Tab[];
  constructor() {
    this.lab = new Tab("lab");

    this.tabList = [this.lab];
  }
  getSave(): any {
    return {
      t: this.tabList.map(t => t.getSave())
    };
  }
  restore(data: any): boolean {
    if ("t" in data) {
      for (const s of data.t) this.tabList.find(u => u.id === s.i).restore(s);
      return true;
    } else {
      return false;
    }
  }
}
