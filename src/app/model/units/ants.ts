import { CONSTANTS } from "../CONSTATS";
import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";
import { UnitGroup } from "../unit-group";

export class Ants extends UnitGroup {
  drone: FullUnit;
  queen: FullUnit;
  nest: FullUnit;

  constructor(game: Game) {
    super("Ants", game);
  }

  declareStuff(): void {
    this.drone = new FullUnit("d");
    this.queen = new FullUnit("q");
    this.nest = new FullUnit("n");
    this.addUnits([this.nest, this.queen, this.drone]);
  }
  setRelations(): void {
    this.drone.generateBuyAction(
      [new Price(this.game.materials.food, new Decimal(20))],
      [this.queen]
    );
    this.queen.generateBuyAction(
      [new Price(this.game.materials.food, new Decimal(20))],
      [this.nest]
    );
    this.nest.generateBuyAction([
      new Price(this.game.materials.food, new Decimal(20))
    ]);

    this.game.materials.food.addProducer(this.drone, 0.1);
    this.drone.addProducer(this.queen, 0.01);
    this.queen.addProducer(this.nest, 0.01);

    this.drone.generateTeamAction(this.game.genTeamPrice(CONSTANTS.PRICE_0));
  }
  addWorlds() {
    //ToDO
  }
}
