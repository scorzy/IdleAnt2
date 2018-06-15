import { FullUnit } from "./full-unit";
import { Game } from "./game";
import { Price } from "./price";
import { Research } from "./research";

export class UnitGroup {
  static maxId = 0;

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
  //#endregion

  constructor(public name: string, public game: Game) {
    this.id = UnitGroup.maxId;
    UnitGroup.maxId++;
  }

  check(noGame = false) {
    this.unlocked = this.list.filter(u => u.unlocked);
    if (!noGame) this.game.check();
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

  setFlags(team = false, twin = false) {
    this.isEnding = this.unlocked.findIndex(u => u.isEnding) > -1;

    this.upTeam =
      team &&
      this.unlocked.findIndex(u => u.teamAction && u.teamAction.canBuy) > -1;

    this.upTwin =
      twin &&
      this.unlocked.findIndex(u => u.twinAction && u.twinAction.canBuy) > -1;
  }

  /**
   * Return a new unitgroup where units are producers of this units
   * @param name
   * @param game
   */
  getProducerGroup(name: string, price: Decimal): UnitGroup {
    const gen = new UnitGroup(name, this.game);

    gen.declareStuff = () => {
      gen.researchList = [];
      const list = this.list.map(
        u => new FullUnit(u.id + "_g", "gen of " + u.name, "")
      );
      gen.addUnits(list);
      gen.firstResearch = new Research(name + "_r", this.game.researches);
      gen.researchList = [];
      list.forEach(u => {
        const res = new Research(u.id + "_r", this.game.researches);
        res.toUnlock = [u];
        gen.researchList.push(res);
      });
    };

    gen.setRelations = () => {
      for (let i = 0; i < this.list.length; i++) {
        const original = this.list[i];
        const producer = gen.list[i];

        //  Production
        original.addProductor(producer);
        original.buyAction.prices.forEach(p => {
          p.base.addProductor(producer, p.price.times(-1));
        });

        //  Buy Action
        producer.generateBuyAction([new Price(original, new Decimal(20))]);

        //  Team Action
        producer.generateTeamAction(
          original.teamAction.prices.map(
            p => new Price(p.base, p.price.times(10), p.growRate)
          ),
          this.game.researches.team2
        );

        //  Twin Action
        producer.generateTwinAction(
          original.twinAction.prices.map(
            p => new Price(p.base, p.price.times(10), p.growRate)
          ),
          this.game.researches.twin
        );

        //  researches
        gen.firstResearch.toUnlock = gen.researchList;
        gen.firstResearch.prices = this.game.genSciencePrice(price);

        gen.researchList.forEach(
          r => (r.prices = this.game.genSciencePrice(price.times(5)))
        );
      }
    };
    return gen;
  }

  updateChart() {
    const qtList = this.selected.map(u => u.quantity);
    const sum = qtList.reduce(
      (p: Decimal, c: Decimal) => p.plus(c),
      new Decimal(0)
    );
    const newChartData = qtList.map(u =>
      Math.round(u.div(sum).toNumber() * 100)
    );
    let toChange = false;

    if (this.chartData.length === newChartData.length)
      for (let i = 0; i < this.selected.length; i++)
        toChange = toChange || newChartData[i] !== this.chartData[i];
    else toChange = true;

    if (toChange) this.chartData = newChartData;
  }
  updateChartLabel() {
    this.chartLabels = this.selected.map(u => u.name + " %");
    this.updateChart();
  }
}
