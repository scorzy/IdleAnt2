import { FullUnit } from "./full-unit";
import { Game } from "./game";
import { BaseUnit } from "./baseUnit";

export abstract class UnitGroup {
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

  abstract declareStuff(): void;
  abstract setRelations(): void;
}
