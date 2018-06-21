import { UnitGroup } from "../unit-group";
import { Game } from "../game";
import { Malus } from "../malus";
import { Materials } from "./materials";

export class WorldMalus extends UnitGroup {
  foodMalus1: Malus;
  foodMalus2: Malus;
  foodMalus3: Malus;

  woodMalus1: Malus;
  woodMalus2: Malus;
  woodMalus3: Malus;

  crystalMalus1: Malus;
  crystalMalus2: Malus;
  crystalMalus3: Malus;

  scienceMalus1: Malus;
  scienceMalus2: Malus;
  scienceMalus3: Malus;

  constructor(game: Game) {
    super("Enemy", game);
  }

  declareStuff(): void {
    this.foodMalus1 = new Malus("foMalu1");
    this.foodMalus2 = new Malus("foMalu2");
    this.foodMalus3 = new Malus("foMalu3");

    this.woodMalus1 = new Malus("woMalu1");
    this.woodMalus2 = new Malus("woMalu2");
    this.woodMalus3 = new Malus("woMalu3");

    this.crystalMalus1 = new Malus("crMalu1");
    this.crystalMalus2 = new Malus("crMalu2");
    this.crystalMalus3 = new Malus("crMalu3");

    this.scienceMalus1 = new Malus("scMalu1");
    this.scienceMalus2 = new Malus("scMalu2");
    this.scienceMalus3 = new Malus("scMalu3");

    this.foodMalus1.first = true;
    this.woodMalus1.first = true;
    this.crystalMalus1.first = true;
    this.scienceMalus1.first = true;

    this.addUnits([
      this.foodMalus3,
      this.foodMalus2,
      this.foodMalus1,
      this.woodMalus3,
      this.woodMalus2,
      this.woodMalus1,
      this.crystalMalus3,
      this.crystalMalus2,
      this.crystalMalus1,
      this.scienceMalus3,
      this.scienceMalus2,
      this.scienceMalus1
    ]);
  }
  setRelations(): void {
    this.foodMalus1.addProducer(this.foodMalus2, new Decimal(0.01));
    this.foodMalus2.addProducer(this.foodMalus3, new Decimal(0.01));

    this.woodMalus1.addProducer(this.woodMalus2, new Decimal(0.01));
    this.woodMalus2.addProducer(this.woodMalus3, new Decimal(0.01));

    this.crystalMalus1.addProducer(this.crystalMalus2, new Decimal(0.01));
    this.crystalMalus2.addProducer(this.crystalMalus3, new Decimal(0.01));

    this.scienceMalus1.addProducer(this.scienceMalus2, new Decimal(0.01));
    this.scienceMalus2.addProducer(this.scienceMalus3, new Decimal(0.01));

    this.foodMalus1.malusType = this.game.materials.food;
    this.woodMalus1.malusType = this.game.materials.wood;
    this.crystalMalus1.malusType = this.game.materials.crystal;
    this.scienceMalus1.malusType = this.game.materials.science;

    this.game.materials.food.malus = this.foodMalus1;
    this.game.materials.wood.malus = this.woodMalus1;
    this.game.materials.crystal.malus = this.crystalMalus1;
    this.game.materials.science.malus = this.scienceMalus1;
  }
}
