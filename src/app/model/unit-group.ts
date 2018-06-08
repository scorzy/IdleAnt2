import { FullUnit } from "./full-unit";
import { Game } from "./game";
import { BaseUnit } from "./baseUnit";
import { Price } from "./price";
import { Research } from "./research";
import { Researchs } from "./units/researchs";

export class UnitGroup {
  list: FullUnit[] = new Array<FullUnit>();
  unlocked: FullUnit[] = new Array<FullUnit>();

  isEnding = false;
  isExpanded = true;

  firstResearch: Research;
  researchList = new Array<Research>();

  constructor(public name: string, public game: Game) {}

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
  /**
   * Return a new unitgroup where units are producers of this units
   * @param name
   * @param game
   */
  getProducerGroup(id: string, price: Decimal): UnitGroup {
    const gen = new UnitGroup(name, this.game);

    gen.declareStuff = () => {
      gen.researchList = [];
      const list = this.list.map(
        u => new FullUnit(u.id + "_g", "gen of " + u.name, "")
      );
      gen.addUnits(list);
      gen.firstResearch = new Research(id + "_r", this.game.researchs);
      gen.researchList = [];
      list.forEach(u => {
        const res = new Research(u.id + "_r", this.game.researchs);
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
          this.game.researchs.team2
        );

        //  Twin Action
        producer.generateTwinAction(
          original.twinAction.prices.map(
            p => new Price(p.base, p.price.times(10), p.growRate)
          ),
          this.game.researchs.twin
        );

        //  Researchs
        gen.firstResearch.toUnlock = gen.researchList;
        gen.firstResearch.prices = this.game.genSciencePrice(price);

        gen.researchList.forEach(
          r => (r.prices = this.game.genSciencePrice(price.times(5)))
        );
      }
    };
    return gen;
  }
}
