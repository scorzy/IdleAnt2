import { getGame } from "../app.component.spec";
import { BuyAction } from "./actions/buy-action";
import { AutoBuy } from "./autoBuy/auto-buy";
import { BugTypes } from "./bugsTypes";
import { FullUnit } from "./full-unit";
import { Game } from "./game";
import { Price } from "./price";
import { UnitGroup } from "./unit-group";

describe("UnitGroup", () => {
  let game: Game;
  let unitGroup: UnitGroup;
  let ant: FullUnit;
  let bee: FullUnit;
  beforeEach(() => {
    game = getGame();
    unitGroup = new UnitGroup("", game);
    ant = new FullUnit("1");
    bee = new FullUnit("2");
    ant.unlocked = true;
    bee.unlocked = true;
    unitGroup.unlocked = [ant, bee];
    game.materials.food.quantity = new Decimal(100);

    ant.generateBuyAction([new Price(game.materials.food, 1)]);
    bee.generateBuyAction([new Price(game.materials.food, 1)]);
    ant.generateTeamAction([new Price(game.materials.food, 1)]);
    bee.generateTeamAction([new Price(game.materials.food, 1)]);
    ant.generateTwinAction([new Price(game.materials.food, 1)]);
    bee.generateTwinAction([new Price(game.materials.food, 1)]);

    unitGroup.addUnits([ant, bee]);
    ant.hasAutoBuyer = true;
    bee.hasAutoBuyer = false;
    ant.buyAction.autoBuyer = jasmine.createSpyObj("AutoBuy", ["update"]);
    ant.buyAction.autoBuyer.active = false;
    ant.teamAction.autoBuyer = jasmine.createSpyObj("AutoBuy", ["update"]);
    ant.teamAction.autoBuyer.active = false;
    ant.twinAction.autoBuyer = jasmine.createSpyObj("AutoBuy", ["update"]);
    ant.twinAction.autoBuyer.active = false;
    ant.buyAction.autoBuyer.quantity = new Decimal(0);
    ant.teamAction.autoBuyer.quantity = new Decimal(0);
    ant.twinAction.autoBuyer.quantity = new Decimal(0);
  });
  it("should create an instance", () => {
    expect(new UnitGroup("", game)).toBeTruthy();
  });
  it("setBugType", () => {
    bee.bugType = BugTypes.BEE;
    spyOn(bee, "setBugType");
    unitGroup.setBugType();
    expect(bee.setBugType).toHaveBeenCalled();
  });
  it("buyN", () => {
    spyOn(bee.buyAction, "buy");
    spyOn(ant.buyAction, "buy");
    unitGroup.buyN(2);
    expect(bee.buyAction.buy).toHaveBeenCalled();
    expect(ant.buyAction.buy).toHaveBeenCalled();
  });
  it("buyTeam", () => {
    spyOn(bee.teamAction, "buy");
    spyOn(ant.teamAction, "buy");
    unitGroup.buyTeam(2);
    expect(bee.teamAction.buy).toHaveBeenCalled();
    expect(ant.teamAction.buy).toHaveBeenCalled();
  });
  it("buyTwins", () => {
    spyOn(bee.twinAction, "buy");
    spyOn(ant.twinAction, "buy");
    unitGroup.buyTwins(2);
    expect(bee.twinAction.buy).toHaveBeenCalled();
    expect(ant.twinAction.buy).toHaveBeenCalled();
  });
  it("allCustom", () => {
    unitGroup.allCustom(20);
    expect(bee.efficiency).toBe(20);
    expect(ant.efficiency).toBe(20);
  });
  it("autoBuyBuy", () => {
    unitGroup.autoBuyBuy(true);
    expect(ant.buyAction.autoBuyer.active).toBeTruthy();
  });
  it("autoBuyTeam", () => {
    unitGroup.autoBuyTeam(true);
    expect(ant.teamAction.autoBuyer.active).toBeTruthy();
  });
  it("autoBuyTwin", () => {
    unitGroup.autoBuyTwin(true);
    expect(ant.twinAction.autoBuyer.active).toBeTruthy();
  });
  it("autoBuy", () => {
    spyOn(unitGroup, "autoBuyBuy");
    spyOn(unitGroup, "autoBuyTeam");
    spyOn(unitGroup, "autoBuyTwin");
    unitGroup.autoBuy(true);
    expect(unitGroup.autoBuyBuy).toHaveBeenCalled();
    expect(unitGroup.autoBuyTeam).toHaveBeenCalled();
    expect(unitGroup.autoBuyTwin).toHaveBeenCalled();
  });
  it("hasAutoBuyBuy", () => {
    expect(unitGroup.hasAutoBuyBuy()).toBeFalsy();
    ant.buyAction.autoBuyer.quantity = new Decimal(1);
    expect(unitGroup.hasAutoBuyBuy()).toBeTruthy();
  });
  it("hasAutoBuyTeam", () => {
    expect(unitGroup.hasAutoBuyTeam()).toBeFalsy();
    ant.teamAction.autoBuyer.quantity = new Decimal(1);
    expect(unitGroup.hasAutoBuyTeam()).toBeTruthy();
  });
  it("hasAutoBuyTwin", () => {
    expect(unitGroup.hasAutoBuyTwin()).toBeFalsy();
    ant.twinAction.autoBuyer.quantity = new Decimal(1);
    expect(unitGroup.hasAutoBuyTwin()).toBeTruthy();
  });
  it("hasAutoBuy", () => {
    spyOn(unitGroup, "hasAutoBuyBuy").and.callThrough();
    spyOn(unitGroup, "hasAutoBuyTeam").and.callThrough();
    spyOn(unitGroup, "hasAutoBuyTwin").and.callThrough();

    let ret = unitGroup.hasAutoBuy();
    expect(ret).toBeFalsy();
    ant.buyAction.autoBuyer.quantity = new Decimal(1);
    ant.teamAction.autoBuyer.quantity = new Decimal(1);
    ant.twinAction.autoBuyer.quantity = new Decimal(1);
    ret = unitGroup.hasAutoBuy();
    expect(ret).toBeTruthy();
    expect(unitGroup.hasAutoBuyBuy).toHaveBeenCalled();
    expect(unitGroup.hasAutoBuyTeam).toHaveBeenCalled();
    expect(unitGroup.hasAutoBuyTwin).toHaveBeenCalled();
  });
});
