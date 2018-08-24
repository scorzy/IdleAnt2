import { CONSTS } from "../CONSTATS";
import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";
import { UnitGroup } from "../unit-group";

export class Ants extends UnitGroup {
  larva: FullUnit;
  queen: FullUnit;
  nest: FullUnit;

  constructor(game: Game) {
    super("Ants", game);
  }

  declareStuff(): void {
    this.larva = new FullUnit("l");
    this.queen = new FullUnit("q");
    this.nest = new FullUnit("n");
    this.addUnits([this.nest, this.queen, this.larva]);
  }
  setRelations(): void {
    this.larva.generateBuyAction(
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

    this.game.materials.food.addProducer(this.larva, 0.1);
    this.larva.addProducer(this.queen, 0.01);
    this.queen.addProducer(this.nest, 0.01);

    this.larva.generateTeamAction(this.game.genTeamPrice(CONSTS.TEAM_PRICE_0));
    this.queen.generateTeamAction(this.game.genTeamPrice(CONSTS.TEAM_PRICE_2));
    this.nest.generateTeamAction(this.game.genTeamPrice(CONSTS.TEAM_PRICE_3));

    this.larva.generateTwinAction(this.game.genTeamPrice(CONSTS.TWIN_PRICE_0));
    this.queen.generateTwinAction(this.game.genTeamPrice(CONSTS.TWIN_PRICE_2));
    this.nest.generateTwinAction(this.game.genTeamPrice(CONSTS.TWIN_PRICE_3));
  }
  addWorlds() {
    //ToDO
  }
}
