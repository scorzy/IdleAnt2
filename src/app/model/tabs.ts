import { Tab } from "./tab";

export class Tabs {
  lab: Tab;
  travel: Tab;
  prestige: Tab;
  autoBuy: Tab;
  mastery: Tab;

  tabList: Tab[];
  constructor() {
    this.lab = new Tab("lab");
    this.travel = new Tab("travel");
    this.prestige = new Tab("prestige");
    this.autoBuy = new Tab("autoBuy");
    this.mastery = new Tab("mastery");

    this.tabList = [
      this.lab,
      this.travel,
      this.prestige,
      this.autoBuy,
      this.mastery
    ];
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
