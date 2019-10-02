import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { UnitGroup } from "../unit-group";
import { World } from "../world";

export class Materials extends UnitGroup {
  food: FullUnit;
  soil: FullUnit;
  crystal: FullUnit;
  science: FullUnit;

  constructor(game: Game) {
    super("Materials", game);
  }

  declareStuff(): void {
    this.food = new FullUnit("f");
    this.soil = new FullUnit("w");
    this.crystal = new FullUnit("c");
    this.science = new FullUnit("s");

    this.food.unlocked = true;

    this.addUnits([this.food, this.soil, this.crystal, this.science]);
    this.list.forEach(m => (m.winNonLiner = false));
  }
  addWorlds() {
    const length = this.list.length;
    for (let i = 0; i < length; i++) {
      const world = new World(this.list[i].id + "Bio");
      World.biome.push(world);
    }
  }
}
