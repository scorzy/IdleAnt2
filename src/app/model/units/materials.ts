import { UnitGroup } from "../unit-group";
import { FullUnit } from "../full-unit";
import { Game } from "../game";

export class Materials extends UnitGroup {
  food: FullUnit;
  wood: FullUnit;
  // metal: FullUnit;
  crystal: FullUnit;
  science: FullUnit;

  constructor(game: Game) {
    super("Materials", game);
  }

  declareStuff(): void {
    this.food = new FullUnit("fo", "Food", "Food");
    this.wood = new FullUnit("wo", "Wood", "Wood");
    // this.metal = new FullUnit("me", "Metal", "Metal");
    this.crystal = new FullUnit("cry", "Crystal", "Crystal");
    this.science = new FullUnit("sci", "Science", "Science");

    this.food.unlocked = true;

    this.addUnits([
      this.food,
      this.wood,
      // this.metal,
      this.crystal,
      this.science
    ]);
  }
  setRelations(): void {
    //Nothig
  }
}
