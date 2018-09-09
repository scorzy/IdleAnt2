import { CONSTS } from "../CONSTATS";
import { Game } from "../game";
import { Price } from "../price";
import { Research } from "../research";
import { UnitGroup } from "../unit-group";

export class Engineers extends UnitGroup {
  constructor(game: Game) {
    super("Engineers", game);
  }

  declareStuff(): void {
    this.generateProducer(this.game.buildings);
    this.firstResearch = new Research("e", this.game.researches);
  }
  setRelations(): void {
    this.game.buildings.firstResearch.toUnlock.push(this.firstResearch);
    this.firstResearch.prices = this.game.genSciencePrice(
      CONSTS.RES_PRICE_3.div(2)
    );

    const len = this.list.length;
    for (let i = 0; i < len; i++) {
      const product = this.game.buildings.list[i];
      const producer = this.list[i];
      const research = this.researchList[i];

      research.prices = this.game.genSciencePrice(CONSTS.RES_PRICE_3);

      this.firstResearch.toUnlock.push(research);

      producer.generateBuyAction([
        new Price(product, CONSTS.PRICE_ENG),
        new Price(
          product.buyAction.prices[product.buyAction.prices.length - 1].base,
          CONSTS.PRICE_3
        )
      ]);

      let cryPrice = producer.buyAction.prices.find(
        p => p.base === this.game.materials.crystal
      );
      if (!cryPrice) {
        cryPrice = new Price(this.game.materials.crystal, 0);
        producer.buyAction.prices.push(cryPrice);
      }
      cryPrice.price = cryPrice.price.plus(CONSTS.PRICE_3);

      product.addProducer(producer);
      product.buyAction.prices.forEach(p =>
        p.base.addProducer(producer, p.price.times(-1))
      );

      this.game.addTeamAction(producer, CONSTS.TEAM_PRICE_3);
      this.game.addTwinAction(producer, CONSTS.TWIN_PRICE_3);
    }

    this.setBugType();
  }
}
