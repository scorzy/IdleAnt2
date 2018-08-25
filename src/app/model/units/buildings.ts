import { CONSTS } from "../CONSTATS";
import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";
import { UnitGroup } from "../unit-group";

export class Buildings extends UnitGroup {
  constructor(game: Game) {
    super("Buildings", game);
  }

  declareStuff(): void {
    this.generateProducer(this.game.advWorkers);
  }
  setRelations(): void {
    const len = this.list.length;
    for (let i = 0; i < len; i++) {
      const product = this.game.advWorkers.list[i];
      const producer = this.list[i];

      producer.generateBuyAction([
        new Price(product, CONSTS.PRICE_0),
        new Price(
          product.buyAction.prices[product.buyAction.prices.length - 1].base,
          CONSTS.PRICE_2
        )
      ]);

      let woodPrice = producer.buyAction.prices.find(
        p => p.base === this.game.materials.wood
      );
      if (!woodPrice) {
        woodPrice = new Price(this.game.materials.wood, 0);
        producer.buyAction.prices.push(woodPrice);
      }
      woodPrice.price = woodPrice.price.plus(CONSTS.PRICE_2);

      product.addProducer(producer);

      this.game.addTeamAction(producer, CONSTS.TEAM_PRICE_2);
      this.game.addTwinAction(producer, CONSTS.TWIN_PRICE_2);
    }
  }
}
