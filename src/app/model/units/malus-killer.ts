import { BaseUnit } from "../baseUnit";
import { CONSTS } from "../CONSTATS";
import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Helper } from "../helper";
import { Price } from "../price";
import { ProductionBonus } from "../production-bonus";
import { Research } from "../research";
import { UnitGroup } from "../unit-group";
import { World } from "../world";

export class MalusKiller extends UnitGroup {
  foodMalusKiller: FullUnit;
  woodMalusKiller: FullUnit;
  crystalMalusKiller: FullUnit;
  scienceMalusKiller: FullUnit;

  bonusRes: Research;

  private readonly price = new Decimal(500);

  constructor(game: Game) {
    super("Army", game);
  }
  declareStuff(): void {
    this.foodMalusKiller = new FullUnit("F");
    this.woodMalusKiller = new FullUnit("W");
    this.crystalMalusKiller = new FullUnit("C");
    this.scienceMalusKiller = new FullUnit("S");

    this.addUnits([
      this.foodMalusKiller,
      this.woodMalusKiller,
      this.crystalMalusKiller,
      this.scienceMalusKiller
    ]);

    this.bonusRes = new Research("aow", this.game.researches);
  }
  setRelations(): void {
    //  Production
    this.game.worldMalus.foodMalus1.addProducer(
      this.foodMalusKiller,
      new Decimal(-0.1)
    );
    this.game.worldMalus.woodMalus1.addProducer(
      this.woodMalusKiller,
      new Decimal(-0.1)
    );
    this.game.worldMalus.crystalMalus1.addProducer(
      this.crystalMalusKiller,
      new Decimal(-0.1)
    );
    this.game.worldMalus.scienceMalus1.addProducer(
      this.scienceMalusKiller,
      new Decimal(-0.1)
    );

    //  Buy actions
    this.foodMalusKiller.generateBuyAction([
      new Price(this.game.materials.food, this.price, 1.1)
    ]);
    this.woodMalusKiller.generateBuyAction([
      new Price(this.game.materials.food, this.price, 1.1)
    ]);
    this.crystalMalusKiller.generateBuyAction([
      new Price(this.game.materials.food, this.price, 1.1)
    ]);
    this.scienceMalusKiller.generateBuyAction([
      new Price(this.game.materials.food, this.price, 1.1)
    ]);

    const prodBon = new ProductionBonus(
      this.game.worldBonus.killBonus,
      new Decimal(0.1)
    );
    const prodBon2 = new ProductionBonus(this.bonusRes, new Decimal(0.1));
    this.bonusRes.prices = this.game.genSciencePrice(CONSTS.PRICE_2);

    //  Team and Twin
    this.list.forEach(u => {
      if (u instanceof FullUnit) {
        this.game.addTeamAction(u, CONSTS.TEAM_PRICE_2);
        this.game.addTwinAction(u, CONSTS.TWIN_PRICE_2);
        u.productionsAll.push(prodBon);
        u.productionsAll.push(prodBon2);
      }
    });
  }
  addWorlds(): void {
    const worldPre = new World("mkPre");
    const worldBio = new World("mkBio");
    const worldSuff = new World("mkSuff");

    [worldPre, worldBio, worldSuff].forEach(w => {
      w.productionsAll.push([this.game.worldBonus.killBonus, new Decimal(1)]);
    });

    worldPre.startingUnit.push([this.game.helpers.general, new Decimal(0)]);
    worldBio.startingUnit.push([this.game.helpers.headquarter, new Decimal(0)]);
    worldSuff.startingUnlocked.push(this.bonusRes);

    World.prefix.push(worldPre);
    World.biome.push(worldBio);
    World.suffix.push(worldSuff);
  }
}
