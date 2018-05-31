import { FullUnit } from "./full-unit";
import { Game } from "./game.service";
import { BaseUnit } from "./baseUnit";

export abstract class UnitGroup {
  list: BaseUnit[] = new Array<BaseUnit>();
  unlocked: BaseUnit[] = new Array<BaseUnit>();

  isEnding = false;
  isExpanded = true;

  constructor(public name: string, public game: Game) {}

  check(noGame = false) {
    this.unlocked = this.list.filter(u => u.unlocked);
    if (!noGame) this.game.check();
  }

  addUnits(units: BaseUnit[]) {
    units.forEach(u => (u.unitGroup = this));
    this.list = units;
  }

  abstract declareStuff(): void;
  abstract setRelations(): void;
}
