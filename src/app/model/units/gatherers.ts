import { BugTypes } from "../bugsTypes";
import { CONSTS } from "../CONSTATS";
import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";
import { UnitGroup } from "../unit-group";

export class Gatherers extends UnitGroup {
  drone: FullUnit;
  geologist: FullUnit;
  student: FullUnit;

  //  Bee
  foraggingBee: FullUnit;

  //  Wasp
  foraggingWasp: FullUnit;

  //  Super Major
  hunter: FullUnit;
  majorWorker: FullUnit;

  constructor(game: Game) {
    super("Gatherers", game);
  }
  declareStuff(): void {
    this.drone = new FullUnit("e");
    this.geologist = new FullUnit("h");
    this.student = new FullUnit("i");
    this.foraggingBee = new FullUnit("Z");
    this.foraggingWasp = new FullUnit("x");
    this.hunter = new FullUnit("hu");
    this.majorWorker = new FullUnit("mw");

    this.addUnits([
      this.drone,
      this.geologist,
      this.student,
      this.foraggingBee,
      this.foraggingWasp,
      this.hunter,
      this.majorWorker
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

    this.list.forEach(u => {
      if (u instanceof FullUnit) {
        this.game.addTeamAction(u, CONSTS.TEAM_PRICE_0);
        this.game.addTwinAction(u, CONSTS.TWIN_PRICE_0);
      }
    });

    this.foraggingBee.generateBuyAction([
      new Price(this.game.bees.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_0)
    ]);
    this.game.materials.food.addProducer(this.foraggingBee);
    this.foraggingBee.setBugType(BugTypes.BEE);

    this.foraggingWasp.generateBuyAction([
      new Price(this.game.wasps.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_0)
    ]);
    this.game.materials.food.addProducer(this.foraggingWasp);
    this.foraggingWasp.setBugType(BugTypes.WASP);

    this.hunter.generateBuyAction(
      [
        new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
        new Price(this.game.materials.food, CONSTS.PRICE_0)
      ],
      [this.majorWorker]
    );
    this.game.materials.food.addProducer(this.hunter, CONSTS.PROD_GAN);
    this.hunter.setBugType(BugTypes.SUPER_MAJOR);

    this.majorWorker.generateBuyAction([
      new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_0)
    ]);
    this.game.materials.soil.addProducer(
      this.majorWorker,
      CONSTS.PROD_GAN.times(0.7)
    );
    this.game.materials.soil.addProducer(
      this.majorWorker,
      CONSTS.PROD_GAN.times(0.3)
    );
    this.game.materials.food.addProducer(this.majorWorker, CONSTS.CONSUME_GAN);
    this.majorWorker.setBugType(BugTypes.SUPER_MAJOR);
  }
}
