import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";
import { UnitGroup } from "../unit-group";
import { World } from "../world";

export class Materials extends UnitGroup {
  food: FullUnit;
  wood: FullUnit;
  crystal: FullUnit;
  science: FullUnit;

  constructor(game: Game) {
    super("Materials", game);
  }

  declareStuff(): void {
    this.food = new FullUnit("fo");
    this.wood = new FullUnit("wo");
    this.crystal = new FullUnit("cry");
    this.science = new FullUnit("sci");

    this.food.unlocked = true;

    this.addUnits([this.food, this.wood, this.crystal, this.science]);
    this.list.forEach(m => (m.winNonLiner = false));
  }
  addWorlds() {
    const lenght = this.list.length;
    for (let i = 0; i < lenght; i++) {
      const world = new World(this.list[i].id + "Bio");
      world.winContidions.push(
        new Price(this.list[i], World.BASE_WIN_CONDITION),
        new Price(this.game.genX3.list[i], World.BASE_WIN_CONDITION)
      );
      World.biome.push(world);
    }
  }
}
