import { BugTypes } from "../bugsTypes";
import { CONSTS } from "../CONSTANTS";
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
  carpenterBee: FullUnit;
  studentBee: FullUnit;

  //  Wasp
  foraggingWasp: FullUnit;
  hornetWasp: FullUnit;
  smartWasp: FullUnit;

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
    this.carpenterBee = new FullUnit("cb");
    this.studentBee = new FullUnit("sb");

    this.foraggingWasp = new FullUnit("x");
    this.hornetWasp = new FullUnit("hw");
    this.smartWasp = new FullUnit("sw");

    this.hunter = new FullUnit("hu");
    this.majorWorker = new FullUnit("mw");

    this.addUnits([
      this.drone,
      this.geologist,
      this.student,
      this.foraggingBee,
      this.carpenterBee,
      this.studentBee,
      this.foraggingWasp,
      this.hornetWasp,
      this.smartWasp,
      this.hunter,
      this.majorWorker
    ]);
  }
  setRelations(): void {
    this.list.forEach(u => {
      if (u instanceof FullUnit) {
        this.game.addTeamAction(u, CONSTS.TEAM_PRICE_0);
        this.game.addTwinAction(u, CONSTS.TWIN_PRICE_0);
      }
    });

    this.setAntsRelations();
    this.setBeeRelations();
    this.setMajorRelations();
    this.setWaspRelations();

    this.majorWorker.setBugType(BugTypes.SUPER_MAJOR);
  }

  private setAntsRelations(): void {
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
  }
  private setBeeRelations(): void {
    this.foraggingBee.generateBuyAction(
      [
        new Price(this.game.bees.larva, CONSTS.PRICE_LARVAE_0, 1),
        new Price(this.game.materials.food, CONSTS.PRICE_0)
      ],
      [this.carpenterBee]
    );
    this.game.materials.food.addProducer(this.foraggingBee);
    this.foraggingBee.setBugType(BugTypes.BEE);

    this.carpenterBee.generateBuyAction(
      [
        new Price(this.game.bees.larva, CONSTS.PRICE_LARVAE_0, 1),
        new Price(this.game.materials.food, CONSTS.PRICE_0)
      ],
      [this.studentBee]
    );
    this.game.materials.food.addProducer(this.carpenterBee, CONSTS.CONSUME_GAN);
    this.game.materials.soil.addProducer(
      this.carpenterBee,
      CONSTS.PROD_GAN.times(0.4)
    );
    this.game.materials.crystal.addProducer(
      this.carpenterBee,
      CONSTS.PROD_GAN.times(0.6)
    );
    this.carpenterBee.setBugType(BugTypes.BEE);

    this.studentBee.generateBuyAction(
      [
        new Price(this.game.bees.larva, CONSTS.PRICE_LARVAE_0, 1),
        new Price(this.game.materials.food, CONSTS.PRICE_0)
      ],
      [this.game.tabs.lab, this.game.researches.team1]
    );
    this.game.materials.science.addProducer(this.studentBee, CONSTS.PROD_GAN);
    this.game.materials.crystal.addProducer(
      this.studentBee,
      CONSTS.CONSUME_GAN
    );
    this.studentBee.setBugType(BugTypes.BEE);
  }
  private setWaspRelations(): void {
    this.foraggingWasp.generateBuyAction(
      [
        new Price(this.game.wasps.larva, CONSTS.PRICE_LARVAE_0, 1),
        new Price(this.game.materials.food, CONSTS.PRICE_0)
      ],
      [this.hornetWasp]
    );
    this.game.materials.food.addProducer(this.foraggingWasp, CONSTS.PROD_GAN);
    this.foraggingWasp.setBugType(BugTypes.WASP);

    this.hornetWasp.generateBuyAction(
      [
        new Price(this.game.wasps.larva, CONSTS.PRICE_LARVAE_0, 1),
        new Price(this.game.materials.food, CONSTS.PRICE_0)
      ],
      [this.smartWasp]
    );
    this.game.materials.crystal.addProducer(this.hornetWasp, CONSTS.PROD_GAN);
    this.game.materials.food.addProducer(this.hornetWasp, CONSTS.CONSUME_GAN);
    this.hornetWasp.setBugType(BugTypes.WASP);

    this.smartWasp.generateBuyAction([
      new Price(this.game.wasps.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_0)
    ]);
    this.game.materials.science.addProducer(this.smartWasp, CONSTS.PROD_GAN);
    this.game.materials.crystal.addProducer(this.smartWasp, CONSTS.CONSUME_GAN);
    this.smartWasp.setBugType(BugTypes.WASP);
  }
  private setMajorRelations(): void {
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
    this.majorWorker.setBugType(BugTypes.SUPER_MAJOR);
    this.game.materials.soil.addProducer(
      this.majorWorker,
      CONSTS.PROD_GAN.times(0.7)
    );
    this.game.materials.crystal.addProducer(
      this.majorWorker,
      CONSTS.PROD_GAN.times(0.3)
    );
    this.game.materials.food.addProducer(this.majorWorker, CONSTS.CONSUME_GAN);
  }
}
