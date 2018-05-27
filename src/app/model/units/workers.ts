import { UnitGroup } from "../unit-group";
import { FullUnit } from "../full-unit";
import { GameService } from "../game.service";
import { Price } from "../price";

export class Workers extends UnitGroup {
  drone: FullUnit;
  geologist: FullUnit;
  constructor(game: GameService) {
    super("Workers", game);
  }
  declareStuff(): void {
    this.drone = new FullUnit("drone", "Drone", "Drone");
    this.geologist = new FullUnit("geologist", "Geologist", "Geologist");

    this.addUnits([this.drone, this.geologist]);
  }
  setRelations(): void {
    this.drone.generateBuyAction(
      [new Price(this.game.materials.food, new Decimal(20), 1.1)],
      [this.geologist]
    );
    this.drone.unlocked = true;
    this.geologist.generateBuyAction([
      new Price(this.game.materials.crystal, new Decimal(20), 1.1)
    ]);
    this.game.materials.food.addProductor(this.drone);
    this.game.materials.crystal.addProductor(this.geologist);
  }
}
