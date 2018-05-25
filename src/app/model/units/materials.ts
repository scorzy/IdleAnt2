import { UnitGroup } from "../unit-group";
import { FullUnit } from "../full-unit";
import { GameService } from "../game.service";

export class Materials extends UnitGroup {
  food: FullUnit;
  wood: FullUnit;
  metal: FullUnit;
  crystal: FullUnit;
  science: FullUnit;

  constructor() {
    super("Materials");
  }

  declareStuff(): void {
    this.food = new FullUnit("fo", "Food", "Food");
    this.wood = new FullUnit("wo", "Wood", "Wood");
    this.metal = new FullUnit("me", "Metal", "Metal");
    this.crystal = new FullUnit("cry", "Crystal", "Crystal");
    this.science = new FullUnit("sci", "Science", "Science");

    this.list = [this.food, this.wood, this.metal, this.crystal, this.science];
  }
  setRelations(): void {
    //Nothig
  }
}
