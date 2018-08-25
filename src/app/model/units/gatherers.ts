import { BugTypes } from "../bugsTypes";
import { CONSTS } from "../CONSTATS";
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
    this.drone = new FullUnit("e");
    this.geologist = new FullUnit("h");
    this.student = new FullUnit("i");
    this.foraggingBee = new FullUnit("B");

    this.addUnits([
      this.drone,
      this.geologist,
      this.student,
      this.foraggingBee
    ]);
  }
  setRelations(): void {
    this.drone.generateBuyAction(
      [
        new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
        new Price(this.game.materials.food, CONSTS.PRICE_0)
      ],
      [this.geologist]
    );
    this.drone.unlocked = true;
    this.geologist.generateBuyAction(
      [
        new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
        new Price(this.game.materials.food, CONSTS.PRICE_0)
      ],
      [this.student]
    );
    this.game.materials.food.addProducer(this.drone, CONSTS.PROD_GAN);
    this.game.materials.crystal.addProducer(this.geologist, CONSTS.PROD_GAN);
    this.game.materials.food.addProducer(this.geologist, CONSTS.CONSUME_GAN);

    this.student.generateBuyAction(
      [
        new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
        new Price(this.game.materials.food, CONSTS.PRICE_0)
      ],
      [this.game.tabs.lab, this.game.researches.team1]
    );
    this.game.materials.science.addProducer(this.student, CONSTS.PROD_GAN);
    this.game.materials.crystal.addProducer(this.student, CONSTS.CONSUME_GAN);

    //#region Bee
    this.foraggingBee.generateBuyAction([
      new Price(this.game.materials.food, new Decimal(25))
    ]);
    this.game.materials.food.addProducer(this.foraggingBee, new Decimal(1.2));
    //#endregion

    this.list.forEach(u => {
      if (u instanceof FullUnit) {
        this.game.addTeamAction(u, CONSTS.TEAM_PRICE_0);
        this.game.addTwinAction(u, CONSTS.TWIN_PRICE_0);
      }
    });

    this.foraggingBee.setBugType(BugTypes.BEE);
  }
}
