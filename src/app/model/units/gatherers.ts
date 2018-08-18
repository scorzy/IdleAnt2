import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";
import { Research } from "../research";
import { UnitGroup } from "../unit-group";

export class Gatherers extends UnitGroup {
  drone: FullUnit;
  geologist: FullUnit;
  student: FullUnit;

  //  Bee
  foraggingBee: FullUnit;

  constructor(game: Game) {
    super("Gatherers", game);
  }
  declareStuff(): void {
    this.drone = new FullUnit("dr");
    this.geologist = new FullUnit("ge");
    this.student = new FullUnit("st");
    this.foraggingBee = new FullUnit("forBee");

    this.addUnits([
      this.drone,
      this.geologist,
      this.student,
      this.foraggingBee
    ]);
  }
  setRelations(): void {
    this.drone.generateBuyAction(
      [new Price(this.game.materials.food, new Decimal(20))],
      [this.geologist]
    );
    this.drone.unlocked = true;
    this.geologist.generateBuyAction(
      [new Price(this.game.materials.food, new Decimal(20))],
      [this.student]
    );
    this.game.materials.food.addProducer(this.drone);
    this.game.materials.crystal.addProducer(this.geologist);
    this.game.materials.food.addProducer(this.geologist, new Decimal(-1));

    this.student.generateBuyAction(
      [new Price(this.game.materials.food, new Decimal(20))],
      [this.game.tabs.lab, this.game.researches.team1]
    );
    this.game.materials.science.addProducer(this.student);
    this.game.materials.crystal.addProducer(this.student, new Decimal(-1));

    this.foraggingBee.generateBuyAction([
      new Price(this.game.materials.food, new Decimal(25))
    ]);
    this.game.materials.food.addProducer(this.foraggingBee, new Decimal(1.2));

    this.list.forEach(u => {
      if (u instanceof FullUnit) {
        u.generateTeamAction(
          this.game.genTeamPrice(new Decimal(500)),
          this.game.researches.team2
        );
        u.generateTwinAction(
          this.game.genTwinPrice(new Decimal(1e3)),
          this.game.researches.twin
        );
      }
    });
  }
}
