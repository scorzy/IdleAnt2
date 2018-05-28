import { UnitGroup } from "../unit-group";
import { FullUnit } from "../full-unit";
import { GameService } from "../game.service";
import { Price } from "../price";

export class Workers extends UnitGroup {
  drone: FullUnit;
  geologist: FullUnit;

  geologist2: FullUnit;
  geologist3: FullUnit;

  constructor(game: GameService) {
    super("Workers", game);
  }
  declareStuff(): void {
    this.drone = new FullUnit("drone", "Drone", "Drone");
    this.geologist = new FullUnit("geologist", "Geologist", "Geologist");

    this.geologist2 = new FullUnit("geologist2", "Geologist2", "Geologist");
    this.geologist3 = new FullUnit("geologist3", "Geologist3", "Geologist");

    this.addUnits([
      this.drone,
      this.geologist,
      this.geologist2,
      this.geologist3
    ]);
  }
  setRelations(): void {
    this.drone.generateBuyAction(
      [new Price(this.game.materials.food, new Decimal(20), 1.1)],
      [this.geologist]
    );
    this.drone.unlocked = true;
    this.geologist.generateBuyAction([
      new Price(this.game.materials.food, new Decimal(20), 1.1)
    ]);
    this.game.materials.food.addProductor(this.drone);
    this.game.materials.crystal.addProductor(this.geologist);
    this.game.materials.food.addProductor(this.geologist, new Decimal(-1));

    this.geologist2.generateBuyAction([
      new Price(this.game.materials.food, new Decimal(1), 1.1)
    ]);
    this.geologist3.generateBuyAction([
      new Price(this.game.materials.food, new Decimal(1), 1.1)
    ]);
    this.geologist.addProductor(this.geologist2);
    this.geologist2.addProductor(this.geologist3);
  }
}
