import { Action } from "../action";
import { Game } from "../game";
import { Price } from "../price";
import { STRINGS } from "../strings";

export class WarpAction extends Action {
  /**
   *  Action for warp
   * @param warp seconds to warp
   * @param game
   */
  constructor(public warp: number, public game: Game) {
    super("warp" + warp, "", "", [new Price(game.time, warp, 1)]);
    const id = "warp" + warp;
    if (id in STRINGS.actions) {
      this.name = STRINGS.actions[id][0];
      this.description = STRINGS.actions[id][1];
    }
    this.unlocked = true;
  }
  buy(toBuy = new Decimal(1)): boolean {
    if (!super.buy()) return false;
    this.game.update(toBuy.toNumber() * 1000 * this.warp);
  }
}
