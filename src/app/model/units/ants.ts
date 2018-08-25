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
    this.icon = "ant";
  }

  declareStuff(): void {
    this.larva = new FullUnit("l");
    this.queen = new FullUnit("q");
    this.nest = new FullUnit("n");
    this.addUnits([this.nest, this.queen, this.larva]);
    this.larva.unlocked = true;
    this.queen.unlocked = true;
  }
  setRelations(): void {
    this.larva.generateBuyAction(
      [new Price(this.game.materials.food, CONSTS.PRICE_0)],
      [this.queen]
    );
    this.queen.generateBuyAction(
      [
        new Price(this.larva, CONSTS.PRICE_LARVAE_1, 1),
        new Price(this.game.materials.food, CONSTS.PRICE_2)
      ],
      [this.nest]
    );
    this.nest.generateBuyAction([
      new Price(this.queen, CONSTS.PRICE_LARVAE_2, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_3),
      new Price(this.game.materials.wood, CONSTS.PRICE_3)
    ]);

    this.larva.addProducer(this.queen, CONSTS.PROD_LARVAE);
    this.queen.addProducer(this.nest, CONSTS.PROD_LARVAE);

    this.game.addTeamAction(this.queen, CONSTS.TEAM_PRICE_2);
    this.game.addTeamAction(this.nest, CONSTS.TEAM_PRICE_3);

    this.game.addTwinAction(this.queen, CONSTS.TWIN_PRICE_2);
    this.game.addTwinAction(this.nest, CONSTS.TWIN_PRICE_3);
  }
  addWorlds() {
    //ToDO
  }
}
