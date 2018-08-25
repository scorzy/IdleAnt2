import { BugTypes } from "../bugsTypes";
import { CONSTS } from "../CONSTATS";
import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";
import { UnitGroup } from "../unit-group";
import { World } from "../world";

export class Bees extends UnitGroup {
  larva: FullUnit;
  queen: FullUnit;
  nest: FullUnit;

  constructor(game: Game) {
    super("Bee", game);
  }

  declareStuff(): void {
    this.larva = new FullUnit("Q");
    this.queen = new FullUnit("P");
    this.nest = new FullUnit("N");
    this.addUnits([this.nest, this.queen, this.larva]);
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
      new Price(this.game.materials.soil, CONSTS.PRICE_3)
    ]);

    this.larva.addProducer(this.queen, CONSTS.PROD_LARVAE);
    this.queen.addProducer(this.nest, CONSTS.PROD_LARVAE);

    this.game.addTeamAction(this.queen, CONSTS.TEAM_PRICE_2);
    this.game.addTeamAction(this.nest, CONSTS.TEAM_PRICE_3);

    this.game.addTwinAction(this.queen, CONSTS.TWIN_PRICE_2);
    this.game.addTwinAction(this.nest, CONSTS.TWIN_PRICE_3);

    this.setBugType(BugTypes.BEE);
  }
  addWorlds() {
    const beePre = new World("beePre");
    const beeBio = new World("beeBio");
    const beeSuff = new World("beeSuff");
    [beeBio, beePre, beeSuff].forEach(w => {
      w.additionalBugs.push(BugTypes.BEE);
      w.winContidions.push(
        new Price(this.nest, CONSTS.BASE_WIN_CONDITION_OTHER)
      );
    });
    World.prefix.push(beePre);
    World.suffix.push(beeSuff);
    World.biome.push(beeBio);
  }
}
