import { isNull } from "@angular/compiler/src/output/output_ast";
import { EventEmitter } from "@angular/core";
import { BugTypes } from "./bugsTypes";
import { FullUnit } from "./full-unit";
import { Game } from "./game";
import { Price } from "./price";
import { Research } from "./research";

export class UnitGroup {
  static maxId = 0;
  level = 0;

  list: FullUnit[] = new Array<FullUnit>();
  unlocked: FullUnit[] = new Array<FullUnit>();

  isEnding = false;
  upTeam = false;
  upTwin = false;
  isExpanded = true;

  firstResearch: Research;
  researchList = new Array<Research>();

  id: number;

  //#region ui
  selected = new Array<FullUnit>();
  // Pie
  chartLabels: string[] = [];
  chartData: number[] = [];
  icon = "";
  //#endregion

  additionalBuyPreces: Price[] = [];

  constructor(public name: string, public game: Game) {
    this.id = UnitGroup.maxId;
    UnitGroup.maxId++;
  }

  check(noGame = false) {
    this.unlocked = this.list.filter(u => u.unlocked);
    if (!noGame) this.game.buildLists();
  }

  addUnits(units: FullUnit[]) {
    units.forEach(u => (u.unitGroup = this));
    this.list = units;
  }

  declareStuff() {
    //
  }
  setRelations() {
    //
  }
  addWorlds() {
    //
  }

  generateProducer(products: UnitGroup) {
    const list = products.list.map(u => new FullUnit(u.id + "G"));
    this.addUnits(list);
    this.list.forEach(u => {
      const res = new Research(u.id, this.game.researches);
      res.toUnlock = [u];
      this.researchList.push(res);
    });
  }

  setFlags(team = false, twin = false) {
    this.isEnding = this.unlocked.findIndex(u => u.isEnding) > -1;

    this.upTeam =
      team &&
      this.unlocked.findIndex(u => u.teamAction && u.teamAction.canBuy) > -1;

    this.upTwin =
      twin &&
      this.unlocked.findIndex(u => u.twinAction && u.twinAction.canBuy) > -1;
  }

  setBugType(bug: BugTypes) {
    this.list.forEach(u => u.setBugType(bug));
  }

  updateChart() {
    const qtList = this.selected.map(u => u.quantity);
    const sum = qtList
      .reduce((p: Decimal, c: Decimal) => p.plus(c), new Decimal(0))
      .max(1);
    const newChartData = qtList.map(u =>
      Math.round(u.div(sum).toNumber() * 100)
    );
    let toChange = false;

    if (this.chartData.length === newChartData.length) {
      for (let i = 0; i < this.selected.length; i++) {
        toChange = toChange || newChartData[i] !== this.chartData[i];
      }
    } else toChange = true;

    if (toChange) this.chartData = newChartData;
  }
  updateChartLabel() {
    this.chartLabels = this.selected.map(u => u.name + " %");
    this.updateChart();
  }

  getReqNum(num: number): Decimal {
    if (isNaN(num)) return new Decimal(0);
    if (num < 1) return new Decimal(0);
    return new Decimal(num);
  }
  buyN(num: number) {
    const n = this.getReqNum(num);
    if (n.gt(0)) {
      this.list
        .filter(u => u.unlocked && u.buyAction && u.buyAction.unlocked)
        .sort((a, b) => a.quantity.cmp(b.quantity))
        .forEach(un => un.buyAction.buy(n));
    }
  }
  buyTeam(num: number) {
    const n = this.getReqNum(num);
    if (n.gt(0)) {
      this.list
        .filter(u => u.unlocked && u.teamAction && u.teamAction.unlocked)
        .sort((a, b) => a.teamAction.quantity.cmp(b.teamAction.quantity))
        .forEach(un => un.teamAction.buy(new Decimal(n)));
    }
  }
  buyTwins(num: number) {
    const n = this.getReqNum(num);
    if (n.gt(0)) {
      this.list
        .filter(u => u.unlocked && u.twinAction && u.twinAction.unlocked)
        .sort((a, b) => a.twinAction.quantity.cmp(b.twinAction.quantity))
        .forEach(un => un.twinAction.buy(new Decimal(n)));
    }
  }
  allCustom(eff: number) {
    this.list.forEach(u => {
      u.efficiency = eff;
    });
  }
}
