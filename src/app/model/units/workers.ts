import { FullUnit } from "../full-unit";
import { UnitGroup } from "../unit-group";
import { Price } from "../price";
import { Game } from "../game";
import { Research } from "../research";

export class Workers extends UnitGroup {
  farmer: FullUnit;
  carpenter: FullUnit;
  miner: FullUnit;
  scientist: FullUnit;

  scientificMethod1: Research;

  private readonly price = new Decimal(100);
  private readonly prod = new Decimal(20);
  private readonly consume = new Decimal(-15);

  constructor(game: Game) {
    super("Workers", game);
  }

  declareStuff(): void {
    this.farmer = new FullUnit("farmer");
    this.carpenter = new FullUnit("carpenter");
    this.miner = new FullUnit("miner");
    this.scientist = new FullUnit("scientist");

    this.scientificMethod1 = new Research("scie1", this.game.researchs);

    this.addUnits([this.farmer, this.carpenter, this.miner, this.scientist]);

    this.firstResearch = new Research("work_res", this.game.researchs);
    this.list.forEach(u => {
      const res = new Research(u.id + "_wr", this.game.researchs);
      res.toUnlock = [u];
      this.researchList.push(res);
    });
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
      new Price(this.game.materials.crystal, this.price, 1.1)
    ]);

    this.game.materials.food.addProductor(this.farmer, this.prod);
    this.game.materials.crystal.addProductor(this.farmer, this.consume);

    this.game.materials.wood.addProductor(this.carpenter, this.prod);
    this.game.materials.food.addProductor(this.carpenter, this.consume);

    this.game.materials.crystal.addProductor(this.miner, this.prod);
    this.game.materials.wood.addProductor(this.miner, this.consume);

    this.game.materials.science.addProductor(this.scientist, this.prod);
    this.game.materials.crystal.addProductor(this.scientist, this.consume);

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
    this.firstResearch.prices = this.game.genSciencePrice(new Decimal(1e3));
    this.researchList.forEach(
      r => (r.prices = this.game.genSciencePrice(new Decimal(5e3)))
    );
    this.firstResearch.toUnlock = this.researchList;

    this.scientificMethod1.prices = this.game.genSciencePrice(new Decimal(1e3));
    this.researchList[3].toUnlock.push(this.scientificMethod1);
    this.game.materials.science.productionsBonus.push([
      this.scientificMethod1,
      new Decimal(0.5)
    ]);
  }
}
