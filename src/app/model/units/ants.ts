import { BaseUnit } from "../baseUnit";
import { Tags } from "../bugsTypes";
import { CONSTS } from "../CONSTANTS";
import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";
import { ProductionBonus } from "../production-bonus";
import { UnitGroup } from "../unit-group";
import { World } from "../world";

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
          CONSTS.PRICE_LARVAE_1.div(2),
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
  }
  addWorlds() {
    const larvaPre = new World("larvaPre");
    const larvaSuff = new World("larvaSuff");
    const larvaProdBonusUnit = new BaseUnit("larvaBon");
    this.game.worldBonus.bonusList.push(larvaProdBonusUnit);
    const larvaBonus = new ProductionBonus(
      larvaProdBonusUnit,
      new Decimal(0.1)
    );
    this.game.units
      .filter(u => u.tags.includes(Tags.LARVA))
      .forEach(u => u.productionsBonus.push(larvaBonus));

    [larvaPre, larvaSuff].forEach(l => {
      l.productionsBonus.push([larvaProdBonusUnit, new Decimal(1)]);
    });
    World.prefix.push(larvaPre);
    World.suffix.push(larvaSuff);

    const queenPre = new World("queenPre");
    const queenSuff = new World("queenSuff");
    const queenProdBonusUnit = new BaseUnit("queenBon");
    this.game.worldBonus.bonusList.push(queenProdBonusUnit);
    const queenBonus = new ProductionBonus(
      queenProdBonusUnit,
      new Decimal(0.1)
    );
    this.game.units
      .filter(u => u.tags.includes(Tags.QUEEN))
      .forEach(u => u.productionsBonus.push(queenBonus));

    [queenPre, queenSuff].forEach(l => {
      l.productionsBonus.push([queenProdBonusUnit, new Decimal(1)]);
    });
    World.prefix.push(queenPre);
    World.suffix.push(queenSuff);
  }
}
