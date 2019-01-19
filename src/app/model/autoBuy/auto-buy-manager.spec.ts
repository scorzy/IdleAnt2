import { getGame } from "../../app.component.spec";
import { AutoBuyManager } from "./auto-buy-manager";

describe("AutoBuyManager", () => {
  it("should create an instance", () => {
    expect(new AutoBuyManager()).toBeTruthy();
  });
  it("getTotalSkillSpent", () => {
    const game = getGame();
    game.experience.quantity = new Decimal(1e3);
    game.gatherers.drone.buyAction.autoBuyer.buy();
    expect(game.autoBuyManager.getTotalSkillSpent().toNumber()).toBe(10);

    game.gatherers.drone.twinAction.autoBuyer.buy();
    expect(game.autoBuyManager.getTotalSkillSpent().toNumber()).toBe(30);

    game.gatherers.drone.twinAction.autoBuyer.buy();
    expect(game.autoBuyManager.getTotalSkillSpent().toNumber()).toBe(56);
  });
});
