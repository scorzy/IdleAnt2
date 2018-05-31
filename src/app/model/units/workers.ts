import { UnitGroup } from "../unit-group";
import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";

export class Workers extends UnitGroup {
  drone: FullUnit;
  geologist: FullUnit;
  student: FullUnit;

  constructor(game: Game) {
    super("Workers", game);
  }
  declareStuff(): void {
    this.drone = new FullUnit("drone", "Drone", "Drone");
    this.geologist = new FullUnit("geologist", "Geologist", "Geologist");
    this.student = new FullUnit("student", "Student", "Student");

    this.addUnits([this.drone, this.geologist, this.student]);
  }
  setRelations(): void {
    this.drone.generateBuyAction(
      [new Price(this.game.materials.food, new Decimal(20), 1.1)],
      [this.geologist]
    );
    this.drone.unlocked = true;
    this.geologist.generateBuyAction(
      [new Price(this.game.materials.food, new Decimal(20), 1.1)],
      [this.student]
    );
    this.game.materials.food.addProductor(this.drone);
    this.game.materials.crystal.addProductor(this.geologist);
    this.game.materials.food.addProductor(this.geologist, new Decimal(-1));

    this.student.generateBuyAction(
      [new Price(this.game.materials.food, new Decimal(20), 1.1)],
      [this.game.tabs.lab]
    );
    this.game.materials.science.addProductor(this.student);
    this.game.materials.crystal.addProductor(this.student, new Decimal(-1));
  }
}
