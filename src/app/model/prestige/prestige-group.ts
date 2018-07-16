import { Action } from "../action";
import { Game } from "../game";
import { Prestige } from "./prestige";

export class PrestigeGroup {
  list = new Array<Prestige>();

  constructor(public id: string, public name: string) {}

  declareStuff(game: Game) {
    //
  }
}
