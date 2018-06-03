import { FullUnit } from "../full-unit";
import { UnitGroup } from "../unit-group";
import { Price } from "../price";
import { Game } from "../game";

export class Worker2 extends UnitGroup {
  farmer: FullUnit;
  carpenter: FullUnit;
  miner: FullUnit;
  scientist: FullUnit;

  private readonly price = new Decimal(100);
  private readonly prod = new Decimal(20);
  private readonly consume = new Decimal(-15);

  constructor(game: Game) {
    super("Gatherers", game);
  }

  declareStuff(): void {
    this.farmer = new FullUnit("farmer", "Farmer", "Farmer");
    this.carpenter = new FullUnit("carpenter", "Carpenter", "Carpenter");
    this.miner = new FullUnit("miner", "Miner", "Miner");
    this.scientist = new FullUnit("scientist", "Scientist", "scientist");

    this.addUnits([this.farmer, this.carpenter, this.miner, this.scientist]);
  }
  setRelations(): void {
    this.farmer.generateBuyAction([
      new Price(this.game.materials.food, this.price, 1.1),
      new Price(this.game.materials.crystal, this.price, 1.1)
    ]);
    this.carpenter.generateBuyAction([
      new Price(this.game.materials.food, this.price.times(2), 1.1)
    ]);
    this.miner.generateBuyAction([
      new Price(this.game.materials.food, this.price, 1.1),
      new Price(this.game.materials.wood, this.price, 1.1)
    ]);
    this.scientist.generateBuyAction([
      new Price(this.game.materials.food, this.price, 1.1),
      new Price(this.game.materials.wood, this.price, 1.1)
    ]);

    this.game.materials.food.addProductor(this.farmer, this.prod);
    this.game.materials.crystal.addProductor(this.farmer, this.consume);

    this.game.materials.wood.addProductor(this.carpenter, this.prod);
    this.game.materials.food.addProductor(this.carpenter, this.consume);

    this.game.materials.crystal.addProductor(this.miner, this.prod);
    this.game.materials.wood.addProductor(this.miner, this.consume);

    this.list.forEach(u => {
      if (u instanceof FullUnit) {
        u.generateTeamAction(
          this.game.genTeamPrice(new Decimal(5e3)),
          this.game.researchs.team2
        );
        u.generateTwinAction(
          this.game.genTwinPrice(new Decimal(1e4)),
          this.game.researchs.twin
        );
      }
    });
  }
}
