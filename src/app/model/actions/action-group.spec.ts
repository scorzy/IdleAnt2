import { getGame } from "../../app.component.spec";
import { Action } from "../action";
import { FullUnit } from "../full-unit";
import { Price } from "../price";
import { ActionGroup } from "./action-group";

describe("ActionGroup", () => {
  const game = getGame();
  it("should create an instance", () => {
    expect(new ActionGroup("", [], game)).toBeTruthy();
  });

  it("Reload", () => {
    const act1 = new Action("", "", "", []);
    const act2 = new Action("", "", "", []);

    act1.canBuy = false;

    const group = new ActionGroup("", [act1, act2], game);
    group.reload(game);

    expect(group.canBuy).toBeFalsy();
  });

  it("Reload prices", () => {
    const unit = new FullUnit("", "", "", new Decimal(100));
    const act1 = new Action("", "", "", [
      new Price(unit, new Decimal(20), 1.1)
    ]);
    const act2 = new Action("", "", "", [
      new Price(unit, new Decimal(30), 1.1)
    ]);
    act1.reload();
    act2.reload();
    const group = new ActionGroup("", [act1, act2], game);
    group.reload(game);

    expect(group.canBuy).toBeTruthy();
    expect(group.pricesTemp[0].price.toNumber()).toBe(50);
  });
});
