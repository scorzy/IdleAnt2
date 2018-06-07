import { UnitGroup } from "../unit-group";
import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";

export class Gatherers extends UnitGroup {
  drone: FullUnit;
  geologist: FullUnit;
  student: FullUnit;

  constructor(game: Game) {
    super("Gatherers", game);
  }
  declareStuff(): void {
    this.drone = new FullUnit("drone");
    this.geologist = new FullUnit("geologist");
    this.student = new FullUnit("student");

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
      [this.game.tabs.lab, this.game.researchs.team1]
    );
    this.game.materials.science.addProductor(this.student);
    this.game.materials.crystal.addProductor(this.student, new Decimal(-1));

    this.list.forEach(u => {
      if (u instanceof FullUnit) {
        u.generateTeamAction(
          this.game.genTeamPrice(new Decimal(500)),
          this.game.researchs.team2
        );
        u.generateTwinAction(
          this.game.genTwinPrice(new Decimal(1e3)),
          this.game.researchs.twin
        );
      }
    });
  }
}
