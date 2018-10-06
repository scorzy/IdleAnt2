import { BugTypes, Tags } from "../bugsTypes";
import { CONSTS } from "../CONSTANTS";
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
    this.larva.tags.push(Tags.LARVA);
    this.queen.tags.push(Tags.QUEEN);
    this.nest.tags.push(Tags.NEST);
  }
  setRelations(): void {
    this.larva.generateBuyAction(
      [
        new Price(
          this.game.materials.food,
          CONSTS.PRICE_0,
          CONSTS.SWARM_PRICE_GROWRATE
        )
      ],
      [this.queen]
    );
    this.queen.generateBuyAction(
      [
        new Price(
          this.larva,
          CONSTS.PRICE_LARVAE_1,
          CONSTS.SWARM_PRICE_GROWRATE
        ),
        new Price(this.game.materials.food, CONSTS.PRICE_QUEEN)
      ],
      [this.nest]
    );
    this.nest.generateBuyAction([
      new Price(this.queen, CONSTS.PRICE_LARVAE_2, CONSTS.SWARM_PRICE_GROWRATE),
      new Price(this.game.materials.food, CONSTS.PRICE_NEST),
      new Price(this.game.materials.soil, CONSTS.PRICE_NEST)
    ]);

    this.larva.addProducer(this.queen, CONSTS.PROD_LARVAE);
    this.queen.addProducer(this.nest, CONSTS.PROD_LARVAE);

    this.game.addTeamAction(this.queen, CONSTS.TEAM_PRICE_2);
    this.game.addTeamAction(this.nest, CONSTS.TEAM_PRICE_3);

    this.game.addTwinAction(this.queen, CONSTS.TWIN_PRICE_2);
    this.game.addTwinAction(this.nest, CONSTS.TWIN_PRICE_3);

    this.list.forEach(u => u.setBugType(BugTypes.BEE));
  }
  addWorlds() {
    const beePre = new World("beePre");
    const beeBio = new World("beeBio");
    const beeSuff = new World("beeSuff");
    [beeBio, beePre, beeSuff].forEach(w => {
      w.additionalBugs.push(BugTypes.BEE);
      w.winConditions.push(
        new Price(this.nest, CONSTS.BASE_WIN_CONDITION_OTHER.times(0.8))
      );
    });
    World.prefix.push(beePre);
    World.suffix.push(beeSuff);
    World.biome.push(beeBio);
  }
}
