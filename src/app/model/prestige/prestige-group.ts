import { Action } from "../action";
import { Game } from "../game";

export class PrestigeGroup {
  list = new Array<Action>();

  constructor(public id: string, public name: string) {}

  declareStuff(game: Game) {
    //
  }
}
