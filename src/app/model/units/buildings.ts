import { CONSTS } from "../CONSTATS";
import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { Price } from "../price";
import { Research } from "../research";
import { UnitGroup } from "../unit-group";

export class Buildings extends UnitGroup {
  constructor(game: Game) {
    super("Buildings", game);
  }

  declareStuff(): void {
    this.generateProducer(this.game.advWorkers);
    this.firstResearch = new Research("u", this.game.researches);
  }
  setRelations(): void {
    this.game.advWorkers.firstResearch.toUnlock.push(this.firstResearch);
    this.firstResearch.prices = this.game.genSciencePrice(
      CONSTS.RES_PRICE_2.div(2)
    );

    const len = this.list.length;
    for (let i = 0; i < len; i++) {
      const product = this.game.advWorkers.list[i];
      const producer = this.list[i];
      const research = this.researchList[i];

      research.prices = this.game.genSciencePrice(CONSTS.RES_PRICE_2);

      this.firstResearch.toUnlock.push(research);

      producer.generateBuyAction([
        new Price(product, CONSTS.PRICE_0),
        new Price(
          product.buyAction.prices[product.buyAction.prices.length - 1].base,
          CONSTS.PRICE_2
        )
      ]);

      let woodPrice = producer.buyAction.prices.find(
        p => p.base === this.game.materials.soil
      );
      if (!woodPrice) {
        woodPrice = new Price(this.game.materials.soil, 0);
        producer.buyAction.prices.push(woodPrice);
      }
      woodPrice.price = woodPrice.price.plus(CONSTS.PRICE_2);

      product.addProducer(producer);
      product.buyAction.prices.forEach(p =>
        p.base.addProducer(producer, p.price.times(-1))
      );

      this.game.addTeamAction(producer, CONSTS.TEAM_PRICE_2);
      this.game.addTwinAction(producer, CONSTS.TWIN_PRICE_2);
    }

    this.setTypes();
  }
}
