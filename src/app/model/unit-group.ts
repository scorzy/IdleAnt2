import { FullUnit } from "./full-unit";
import { GameService } from "./game.service";
import { BaseUnit } from "./baseUnit";

export abstract class UnitGroup {
  isEnding = false;
  isCollapsed = false;

  constructor(
    public name: string,
    public list: BaseUnit[] = new Array<BaseUnit>(),
    public unlocked: BaseUnit[] = new Array<BaseUnit>()
  ) {}

  check(noGame = false) {
    this.unlocked = this.list.filter(u => u.unlocked);
    // if (!noGame) GameService.gameService.check();
  }

  abstract declareStuff(): void;
  abstract setRelations(): void;
}
