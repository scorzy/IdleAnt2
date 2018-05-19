import { UnlockAction } from "./unlock-action";

describe("UnlockAction", () => {
  it("should create an instance", () => {
    expect(new UnlockAction("id", "name", "desc", [], [])).toBeTruthy();
  });
  it("should unlock", () => {
    const toUnlock = jasmine.createSpyObj("IUnlocable", ["unlock"]);
    const unl = new UnlockAction("id", "name", "desc", [], [toUnlock]);
    unl.buy(new Decimal(1));

    expect(toUnlock.unlock).toHaveBeenCalled();
  });
  it("unlock only one time", () => {
    const toUnlock = jasmine.createSpyObj("IUnlocable", ["unlock"]);
    const unl = new UnlockAction("id", "name", "desc", [], [toUnlock]);
    unl.quantity = new Decimal(1);
    unl.done = true;
    unl.buy(new Decimal(1));

    expect(toUnlock.unlock).toHaveBeenCalledTimes(0);
  });
});
