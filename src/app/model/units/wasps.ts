import { BugTypes } from "../bugsTypes";
import { CONSTS } from "../CONSTATS";
import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";
import { UnitGroup } from "../unit-group";
import { World } from "../world";

export class Wasps extends UnitGroup {
  larva: FullUnit;
  queen: FullUnit;
  nest: FullUnit;

  constructor(game: Game) {
    super("Wasps", game);
  }

  declareStuff(): void {
    this.larva = new FullUnit("y");
    this.queen = new FullUnit("z");
    this.nest = new FullUnit("r");
    this.addUnits([this.nest, this.queen, this.larva]);
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

    this.list.forEach(u => u.setBugType(BugTypes.WASP));
  }
  addWorlds() {
    const waspPre = new World("waspPre");
    const waspBio = new World("waspBio");
    const waspSuff = new World("waspSuff");
    [waspBio, waspPre, waspSuff].forEach(w => {
      w.additionalBugs.push(BugTypes.WASP);
      w.winContidions.push(
        new Price(this.nest, CONSTS.BASE_WIN_CONDITION_OTHER.times(2))
      );
    });
    World.prefix.push(waspPre);
    World.suffix.push(waspSuff);
    World.biome.push(waspBio);
  }
}
