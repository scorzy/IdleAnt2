import { FullUnit } from "./full-unit";
import { Game } from "./game";
import { BaseUnit } from "./baseUnit";
import { Price } from "./price";

export class UnitGroup {
  list: FullUnit[] = new Array<FullUnit>();
  unlocked: FullUnit[] = new Array<FullUnit>();

  isEnding = false;
  isExpanded = true;

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

  getProducerGroup(name: string, game: Game): UnitGroup {
    const gen = new UnitGroup(name, game);
    gen.declareStuff = () => {
      const list = this.list.map(
        u => new FullUnit(u.id + "_g", "gen of " + u.name, "")
      );
      gen.addUnits(list);
    };
    gen.setRelations = () => {
      for (let i = 0; i < this.list.length; i++) {
        const original = this.list[i];
        const producer = gen.list[i];
        original.addProductor(producer);
        original.buyAction.prices.forEach(p => {
          p.base.addProductor(producer, p.price.times(-1));
        });
        producer.generateBuyAction([new Price(original, new Decimal(20))]);
        producer.generateTeamAction(
          original.teamAction.prices.map(
            p => new Price(p.base, p.price.times(10), p.growRate)
          ),
          this.game.researchs.team2
        );
        producer.generateTwinAction(
          original.twinAction.prices.map(
            p => new Price(p.base, p.price.times(10), p.growRate)
          ),
          this.game.researchs.twin
        );
      }
    };
    return gen;
  }
}
